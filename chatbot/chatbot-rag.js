// chatbot-rag.js
// LLM Style RAG Chatbot - Floating Version (Same Style)
// Search Modes: B = Global (default) | C = Hybrid (Current + Fallback Global)

(function() {
    'use strict';

    console.log('🤖 RAG Chatbot: Starting...');

    // ============================================================
    // CONFIGURATION
    // ============================================================
    const CONFIG = {
        // 🔴 Replace with your actual Mistral API key
        MISTRAL_API_KEY: 'YOUR_MISTRAL_API_KEY_HERE',
        MISTRAL_MODEL: 'mistral-small-latest',
        TEMPERATURE: 0.7,
        MAX_TOKENS: 800
    };

    const USE_MOCK = !CONFIG.MISTRAL_API_KEY || CONFIG.MISTRAL_API_KEY === 'YOUR_MISTRAL_API_KEY_HERE';

    if (USE_MOCK) {
        console.log('🤖 Using mock mode (no API key)');
    }

    // ============================================================
    // SEARCH MODE
    // 'global' = Option B → saare subjects me search (DEFAULT)
    // 'hybrid' = Option C → pehle current tab, kam mile toh global fallback
    // ============================================================
    let searchMode = localStorage.getItem('chatbot_search_mode') || 'global';

    // ============================================================
    // DOM ELEMENTS
    // ============================================================
    let els = {};
    let isOpen = false;
    let isProcessing = false;
    let isReady = false;
    let initAttempts = 0;

    function getElements() {
        return {
            toggle: document.getElementById('chatbotFloatBtn'),
            container: document.getElementById('chatbotWindow'),
            messages: document.getElementById('chatbotMessages'),
            input: document.getElementById('chatbotInput'),
            send: document.getElementById('chatbotSend'),
            clear: document.getElementById('chatbotClear'),
            status: document.getElementById('chatbotStatus'),
            typing: document.getElementById('chatbotTyping'),
            close: document.getElementById('chatbotCloseBtn'),
            modeGlobal: document.getElementById('chatbotModeGlobal'),
            modeHybrid: document.getElementById('chatbotModeHybrid')
        };
    }

    function hasAllElements(el) {
        return el.toggle && el.container && el.messages &&
               el.input && el.send && el.clear && el.close;
    }

    // ============================================================
    // KNOWLEDGE BASE
    // ============================================================
    let documents = [];
    let allDocuments = [];
    let currentSubject = 'Unknown';
    let isLoaded = false;
    let allSubjectsLoaded = false;

    const CONFIG_MAP = {
        domestic_installation_wiring: () => window.DOMESTIC_INSTALLATION_WIRING_CONFIG,
        domestic_installation_apparatus: () => window.DOMESTIC_INSTALLATION_APPARATUS_CONFIG,
        domestic_installation_circuit_diagram: () => window.DOMESTIC_INSTALLATION_CIRCUIT_DIAGRAM_CONFIG,
        domestic_installation_energy_measurement: () => window.DOMESTIC_INSTALLATION_ENERGY_MEASUREMENT_CONFIG,
        domestic_installation_protective_devices: () => window.DOMESTIC_INSTALLATION_PROTECTIVE_DEVICES_CONFIG,
        domestic_installation_simple_calculation: () => window.DOMESTIC_INSTALLATION_SIMPLE_CALCULATION_CONFIG,
        domestic_installation_testing_fault: () => window.DOMESTIC_INSTALLATION_TESTING_FAULT_CONFIG,
        electrical_principles: () => window.ELECTRICAL_PRINCIPLES_CONFIG,
        electromagnetism: () => window.ELECTROMAGNETISM_CONFIG,
        materials: () => window.MATERIALS_CONFIG,
        ac_generators: () => window.AC_GENERATORS_CONFIG,
        dc_generators: () => window.DC_GENERATORS_CONFIG,
        batteries: () => window.BATTERIES_CONFIG,
        ac_motors: () => window.AC_MOTORS_CONFIG,
        dc_motors: () => window.DC_MOTORS_CONFIG,
        ac_circuits: () => window.AC_CIRCUITS_CONFIG,
        control_gear: () => window.CONTROL_GEAR_CONFIG,
        transformation: () => window.TRANSFORMATION_CONFIG,
        overhead_lines: () => window.OVERHEAD_LINES_CONFIG,
        underground_cables: () => window.UNDERGROUND_CABLES_CONFIG,
        transmission2: () => window.TRANSMISSION2_CONFIG,
        illumination: () => window.ILLUMINATION_CONFIG,
        generation: () => window.GENERATION_CONFIG,
        industrial_installation_wiring: () => window.INDUSTRIAL_INSTALLATION_WIRING_CONFIG,
        industrial_installation_circuit_diagrams: () => window.INDUSTRIAL_INSTALLATION_CIRCUIT_DIAGRAMS_CONFIG,
        industrial_installation_pump: () => window.INDUSTRIAL_INSTALLATION_PUMP_CONFIG,
        industrial_installation_apparatus: () => window.INDUSTRIAL_INSTALLATION_APPARATUS_CONFIG,
        industrial_installation_power_energy_measurement: () => window.INDUSTRIAL_INSTALLATION_POWER_ENERGY_MEASUREMENT_CONFIG,
        industrial_installation_simple_calculation: () => window.INDUSTRIAL_INSTALLATION_SIMPLE_CALCULATION_CONFIG,
        industrial_installation_testing_fault: () => window.INDUSTRIAL_INSTALLATION_TESTING_FAULT_CONFIG,
        industrial_installation_protective_devices: () => window.INDUSTRIAL_INSTALLATION_PROTECTIVE_DEVICES_CONFIG,
        overhead_lines_survey: () => window.OVERHEAD_LINES_SURVEY_CONFIG,
        overhead_lines_testing_maintenance: () => window.OVERHEAD_LINES_TESTING_MAINTENANCE_CONFIG,
        overhead_lines_selection_of_supports: () => window.OVERHEAD_LINES_SELECTION_OF_SUPPORTS_CONFIG,
        overhead_lines_types_and_size_of_conductors: () => window.OVERHEAD_LINES_TYPES_AND_SIZE_OF_CONDUCTORS_CONFIG,
        overhead_lines_earthings: () => window.OVERHEAD_LINES_EARTHINGS_CONFIG,
        underground_cables_complete: () => window.UNDERGROUND_CABLES_COMPLETE_CONFIG,
        substations_control_room_layout: () => window.SUBSTATIONS_CONTROL_ROOM_LAYOUT_CONFIG,
        substations_control_room_Power_and_distribution_transformers: () => window.SUBSTATIONS_CONTROL_ROOM_POWER_AND_DISTRIBUTION_TRANSFORMERS_CONFIG,
        substations_control_room_equipments: () => window.SUBSTATIONS_CONTROL_ROOM_EQUIPMENTS_CONFIG,
        substations_control_room_testing: () => window.SUBSTATIONS_CONTROL_ROOM_TESTING_CONFIG,
        substations_control_room_design: () => window.SUBSTATIONS_CONTROL_ROOM_DESIGN_CONFIG,
        substations_control_room_maintenance: () => window.SUBSTATIONS_CONTROL_ROOM_MAINTENANCE_CONFIG,
        motors_generators_dc_ac: () => window.MOTORS_GENERATORS_DC_AC_CONFIG,
        operational_knowledge_three: () => window.OPERATIONAL_KNOWLEDGE_THREE_CONFIG,
        operational_knowledge_two: () => window.OPERATIONAL_KNOWLEDGE_TWO_CONFIG,
        operational_knowledge: () => window.OPERATIONAL_KNOWLEDGE_CONFIG,
        safety_rules_one: () => window.SAFETY_RULES_ONE_CONFIG,
        safety_rules_two: () => window.SAFETY_RULES_TWO_CONFIG,
        safety_rules_three: () => window.SAFETY_RULES_THREE_CONFIG,
        sports_gk: () => window.SPORTS_GK_CONFIG,
        aptitude: () => window.APTITUDE_CONFIG,
        general_knowledge: () => window.GENERAL_KNOWLEDGE_CONFIG,

        democracy: () => window.DEMOCRACY_CONFIG,
        geography: () => window.GEOGRAPHY10_CONFIG,
        history: () => window.HISTORY_CONFIG,
		science10: () => window.SCIENCE_CLASS10_CONFIG,
		mathematics2: () => window.MATHEMATICS2_CONFIG,
    };

    function getConfig(subjectId) {
        if (window.ELECTRICAL_CONFIG && window.ELECTRICAL_CONFIG.getConfig) {
            const config = window.ELECTRICAL_CONFIG.getConfig(subjectId);
            if (config) return config;
        }
        const getter = CONFIG_MAP[subjectId];
        return getter ? getter() : null;
    }

    function getCurrentSubjectId() {
        if (window._currentSubject) return window._currentSubject;
        const activeTab = document.querySelector('.tab-main.active');
        if (activeTab && activeTab.dataset.subject) return activeTab.dataset.subject;
        const activeSubTab = document.querySelector('.tab-sub.active');
        if (activeSubTab && activeSubTab.dataset.subject) return activeSubTab.dataset.subject;
        return 'domestic_installation_wiring';
    }

    // ============================================================
    // PARSE ONE CONFIG → push docs into target array
    // ============================================================
    function parseConfig(config, subjectId, targetArray) {
        if (!config || !config.chapters) return 0;
        const subjectTitle = config.title?.english || config.id || subjectId;
        let count = 0;

        for (const chapter of config.chapters) {
            if (!chapter.topics) continue;
            const chapterName = chapter.display_name?.english || chapter.id || 'Unknown';

            for (const topic of chapter.topics) {
                if (!topic.concepts) continue;
                const topicName = topic.display_name?.english || topic.id || 'Unknown';

                for (const concept of topic.concepts) {
                    const name = concept.display_name?.english || concept.display_name?.hindi || '';
                    const desc = concept.description?.english || concept.description?.hindi || '';

                    if (name || desc) {
                        targetArray.push({
                            id: concept.id || 'unknown',
                            name: name,
                            description: desc,
                            subject: subjectTitle,
                            subjectId: subjectId,
                            chapter: chapterName,
                            topic: topicName,
                            content: `${name} ${desc} ${chapterName} ${topicName} ${subjectTitle}`.toLowerCase()
                        });
                        count++;
                    }
                }
            }
        }
        return count;
    }

    // ============================================================
    // LOAD CURRENT SUBJECT
    // ============================================================
    function loadSubject(subjectId) {
        console.log(`📚 Loading current subject: ${subjectId}`);
        const config = getConfig(subjectId);
        if (!config || !config.chapters) {
            console.warn(`📚 No config for: ${subjectId}`);
            return false;
        }

        currentSubject = config.title?.english || config.id || subjectId;
        documents = [];
        parseConfig(config, subjectId, documents);
        isLoaded = true;
        console.log(`📚 Loaded ${documents.length} docs from: ${subjectId}`);
        return true;
    }

    // ============================================================
    // ✅ LOAD ALL SUBJECTS (Global search — Option B)
    // ============================================================
    function loadAllSubjects() {
        if (allSubjectsLoaded) return true;

        console.log('🌐 Loading ALL subjects for global search...');
        allDocuments = [];
        let total = 0;

        for (const subjectId in CONFIG_MAP) {
            const config = getConfig(subjectId);
            if (config) {
                total += parseConfig(config, subjectId, allDocuments);
            }
        }

        allSubjectsLoaded = true;
        console.log(`🌐 Loaded ${total} docs from ALL subjects`);
        return true;
    }

    // ============================================================
    // ✅ CORE SEARCH — Sub-tab (topic) wise grouped results
    // ============================================================
    function searchIn(sourceDocs, query, topK = 12) {
        if (!sourceDocs || sourceDocs.length === 0) {
            return { flat: [], grouped: {} };
        }
        const q = query.toLowerCase().trim();
        if (!q) return { flat: [], grouped: {} };

        const stopWords = ['what', 'is', 'are', 'the', 'a', 'an', 'of', 'for', 'on', 'at', 'to', 'in', 'with', 'without', 'by', 'from', 'up', 'down', 'off', 'over', 'under', 'how', 'does', 'do', 'explain', 'define'];
        const words = q.split(/\s+/).filter(w => w.length > 2 && !stopWords.includes(w));

        const bigrams = [];
        for (let i = 0; i < words.length - 1; i++) {
            bigrams.push(words[i] + ' ' + words[i + 1]);
        }

        const scored = sourceDocs.map(doc => {
            let score = 0;
            const content = doc.content.toLowerCase();
            const name = doc.name.toLowerCase();
            const desc = (doc.description || '').toLowerCase();

            if (content.includes(q)) {
                score += 100;
                const count = (content.match(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
                score += count * 20;
            }
            if (name.includes(q)) score += 80;
            if (desc.includes(q)) score += 60;

            for (const bigram of bigrams) {
                if (content.includes(bigram)) score += 30;
                if (name.includes(bigram)) score += 25;
            }

            for (const word of words) {
                if (word.length < 2) continue;
                if (content.includes(word)) {
                    const count = (content.match(new RegExp(word, 'g')) || []).length;
                    score += count * 15;
                }
                if (name.includes(word)) score += 20;
                if (desc.includes(word)) score += 10;
            }

            if (doc.chapter.toLowerCase().includes(q)) score += 40;
            if (doc.topic.toLowerCase().includes(q)) score += 50;

            if (doc.description.length > 200) score += 5;
            if (doc.description.length > 500) score += 10;

            return { document: doc, score: score };
        });

        scored.sort((a, b) => b.score - a.score);

        const flat = scored
            .filter(item => item.score > 5)
            .slice(0, topK)
            .map(item => item.document);

        const grouped = {};
        for (const doc of flat) {
            const key = `${doc.subject || ''}|||${doc.chapter}|||${doc.topic}`;
            if (!grouped[key]) {
                grouped[key] = {
                    subject: doc.subject || '',
                    chapter: doc.chapter,
                    topic: doc.topic,
                    docs: []
                };
            }
            grouped[key].docs.push(doc);
        }

        return { flat, grouped };
    }

    // ============================================================
    // ✅ SMART SEARCH — Mode B / Mode C dispatcher
    // ============================================================
    function performSearch(query) {
        if (searchMode === 'global') {
            loadAllSubjects();
            const result = searchIn(allDocuments, query, 14);
            result.scope = 'global';
            result.scopeLabel = '🌐 Global (All Subjects)';
            console.log(`🌐 Global search: ${result.flat.length} results`);
            return result;
        }

        const subjectId = getCurrentSubjectId();
        loadSubject(subjectId);

        let result = searchIn(documents, query, 14);
        console.log(`🎯 Hybrid step 1 — current subject: ${result.flat.length} results`);

        if (result.flat.length < 3) {
            console.log('🌐 Hybrid step 2 — global fallback triggered');
            loadAllSubjects();
            const globalResult = searchIn(allDocuments, query, 14);

            if (globalResult.flat.length > result.flat.length) {
                globalResult.scope = 'hybrid-global';
                globalResult.scopeLabel = `🔄 Current tab me kam mila → Global fallback (${globalResult.flat.length} results)`;
                globalResult.currentDocs = result.flat;
                return globalResult;
            }

            result.scope = 'hybrid-current';
            result.scopeLabel = `🎯 Current tab (${currentSubject}) — ${result.flat.length} results`;
            return result;
        }

        result.scope = 'hybrid-current';
        result.scopeLabel = `🎯 Current tab (${currentSubject}) — ${result.flat.length} results`;
        return result;
    }

    // ============================================================
    // ✅ CONTEXT BUILDER — Sub-tab wise
    // ============================================================
    function createContext(grouped) {
        if (!grouped || Object.keys(grouped).length === 0) {
            return { text: '', sources: [] };
        }
        let context = '';
        const sources = [];

        for (const key in grouped) {
            const group = grouped[key];
            const subj = group.subject ? ` [Subject: ${group.subject}]` : '';
            context += `\n=== SUB-TAB: ${group.topic} (Chapter: ${group.chapter})${subj} ===\n`;
            sources.push(`${group.subject ? group.subject + ' > ' : ''}${group.chapter} > ${group.topic}`);

            for (const doc of group.docs) {
                context += `[CONCEPT: ${doc.name}]\n`;
                context += `${doc.description}\n\n`;
            }
        }
        return { text: context, sources };
    }

    // ============================================================
    // ✅ MISTRAL API CALL
    // ============================================================
    async function callMistralAPI(prompt) {
        if (USE_MOCK) {
            await new Promise(r => setTimeout(r, 500 + Math.random() * 300));
            return generateMockResponse(prompt);
        }

        try {
            console.log('🤖 Calling Mistral API...');
            const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.MISTRAL_API_KEY}`
                },
                body: JSON.stringify({
                    model: CONFIG.MISTRAL_MODEL,
                    messages: [
                        {
                            "role": "system",
                            "content": `You are an expert Electrical Engineering tutor for CIL/SECL/MCL/NCL exam preparation.

RULES:
1. Answer based ONLY on the provided context
2. Organize your answer SUB-TAB wise (each topic separately)
3. For each sub-tab, provide:
   - Sub-tab name as heading
   - Subject name (if multiple subjects present)
   - Concepts explained clearly
   - Source citation at end
4. If context doesn't contain the answer, say "I don't have enough information about this topic"
5. Provide clear, structured, and educational explanations
6. Use headings, bullet points, and examples
7. Explain concepts in simple terms
8. Include formulas if present in context`
                        },
                        { "role": "user", "content": prompt }
                    ],
                    temperature: CONFIG.TEMPERATURE,
                    max_tokens: CONFIG.MAX_TOKENS
                })
            });

            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            const data = await response.json();
            console.log('✅ API Response received');
            return data.choices[0].message.content;
        } catch (error) {
            console.error('❌ Mistral API Error:', error);
            return generateMockResponse(prompt);
        }
    }

    // ============================================================
    // ✅ MOCK RESPONSE — Sub-tab wise
    // ============================================================
    function generateMockResponse(prompt) {
        const queryMatch = prompt.match(/\*\*QUESTION:\*\*\n([\s\S]*?)(?=\n\n\*\*INSTRUCTIONS|\*\*ANSWER|\n\n|$)/);
        const query = queryMatch ? queryMatch[1].trim() : 'the topic';

        const result = performSearch(query);
        const grouped = result.grouped;

        if (!grouped || Object.keys(grouped).length === 0) {
            return generateFallbackResponse(query);
        }

        let response = `## 📚 ${query.charAt(0).toUpperCase() + query.slice(1)}\n\n`;
        response += `*${result.scopeLabel || ''}*\n\n`;
        response += `Found across **${Object.keys(grouped).length} sub-tab(s)**:\n\n`;

        for (const key in grouped) {
            const group = grouped[key];
            response += `### 📘 ${group.topic}\n`;
            if (group.subject) response += `*📗 Subject: ${group.subject}*\n`;
            response += `*📂 Chapter: ${group.chapter}*\n\n`;

            for (const doc of group.docs.slice(0, 3)) {
                response += `**🔹 ${doc.name}**\n`;
                response += `${doc.description}\n\n`;
            }
            response += `---\n\n`;
        }

        response += `💡 **Ask a follow-up question to learn more!**`;
        return response;
    }

    function generateFallbackResponse(query) {
        const pool = searchMode === 'global' ? allDocuments : documents;
        const keywords = query.toLowerCase().split(/\s+/);
        const matchedDocs = [];
        const seen = new Set();

        for (const doc of pool) {
            for (const word of keywords) {
                if (word.length < 3) continue;
                if (doc.content.includes(word) && !seen.has(doc.id)) {
                    seen.add(doc.id);
                    matchedDocs.push(doc);
                    break;
                }
            }
        }

        if (matchedDocs.length > 0) {
            const groupedFallback = {};
            for (const doc of matchedDocs) {
                const key = `${doc.subject || ''}|||${doc.chapter}|||${doc.topic}`;
                if (!groupedFallback[key]) {
                    groupedFallback[key] = { subject: doc.subject, chapter: doc.chapter, topic: doc.topic, docs: [] };
                }
                groupedFallback[key].docs.push(doc);
            }

            let response = `## 📚 ${query.charAt(0).toUpperCase() + query.slice(1)}\n\n`;
            response += `Related concepts:\n\n`;

            let count = 0;
            for (const key in groupedFallback) {
                if (count >= 3) break;
                const group = groupedFallback[key];
                response += `### 📘 ${group.topic}\n`;
                if (group.subject) response += `*📗 Subject: ${group.subject}*\n`;
                response += `*📂 Chapter: ${group.chapter}*\n\n`;

                for (const doc of group.docs.slice(0, 2)) {
                    response += `**🔹 ${doc.name}**\n`;
                    response += `${doc.description.substring(0, 300)}${doc.description.length > 300 ? '...' : ''}\n\n`;
                }
                response += `---\n\n`;
                count++;
            }

            response += `💡 **Try asking a more specific question!**`;
            return response;
        }

        const topics = [...new Set(pool.slice(0, 15).map(d => d.topic))];
        return `## 🤔 I don't have enough information about "${query}"

📚 **Search Mode:** ${searchMode === 'global' ? '🌐 Global (All Subjects)' : '🔄 Hybrid'}
📊 **Docs available:** ${pool.length}

📝 **Sample Topics:**
${topics.map(t => `• ${t}`).join('\n')}

💡 **Try asking:**
• A specific concept name
• A question about working principles
• Something about applications`;
    }

    // ============================================================
    // ✅ EXPOSE FUNCTIONS
    // ============================================================
    window.sendChatbotMessage = async function(message) {
        console.log(`📤 Sending message: "${message}"`);
        const result = performSearch(message);
        const grouped = result.grouped;

        if (!grouped || Object.keys(grouped).length === 0) {
            return `I couldn't find specific information about "${message}".

📚 **Search Mode:** ${searchMode === 'global' ? '🌐 Global' : '🔄 Hybrid'}
📊 **Docs searched:** ${searchMode === 'global' ? allDocuments.length : documents.length}

💡 Try rephrasing or switch search mode.`;
        }

        let response = `## 📚 ${message.charAt(0).toUpperCase() + message.slice(1)}\n\n`;
        response += `*${result.scopeLabel || ''}*\n\n`;

        for (const key in grouped) {
            const group = grouped[key];
            response += `### 📘 ${group.topic}\n`;
            if (group.subject) response += `*📗 Subject: ${group.subject}*\n`;
            response += `*📂 Chapter: ${group.chapter}*\n\n`;

            for (const doc of group.docs.slice(0, 2)) {
                response += `**🔹 ${doc.name}**\n`;
                response += `${doc.description}\n\n`;
            }
            response += `---\n\n`;
        }

        response += `\n📖 **Subject**: ${currentSubject}`;
        return response;
    };

    window.searchDocuments = searchIn;
    window.getDocuments = () => documents;
    window.getAllDocuments = () => allDocuments;
    window.getSubjectName = () => currentSubject;
    window.isLoaded = () => isLoaded;
    window.reloadSubject = loadSubject;
    window.setSearchMode = (mode) => { searchMode = mode; };

    // ============================================================
    // ✅ SMART SCROLL
    // ============================================================
    function scrollToElement(element) {
        if (!element || !els.messages) return;

        setTimeout(function() {
            const containerRect = els.messages.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            const isVisible = (
                elementRect.top >= containerRect.top &&
                elementRect.bottom <= containerRect.bottom
            );

            if (isVisible) {
                return;
            }

            const elementTop = elementRect.top - containerRect.top + els.messages.scrollTop;
            const offsetFromTop = 100;

            const targetScroll = Math.max(0, elementTop - offsetFromTop);

            els.messages.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        }, 50);
    }

    // ============================================================
    // ✅ MARKDOWN RENDERER — PROPER SPACE + NEWLINE HANDLING
    // ============================================================
    function renderMarkdown(text) {
        if (!text) return '';

        // 1. Normalize line endings
        text = String(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        // 2. Trim trailing whitespace per line
        text = text.split('\n').map(line => line.replace(/[ \t]+$/, '')).join('\n');

        // 3. Horizontal rule (---)
        text = text.replace(/^[ \t]*---[ \t]*$/gm, '<hr>');

        // 4. Headings (### first, then ##, then #)
        text = text.replace(/^[ \t]*######[ \t]+(.+?)[ \t]*$/gm, '<h5>$1</h5>');
        text = text.replace(/^[ \t]*#####[ \t]+(.+?)[ \t]*$/gm, '<h5>$1</h5>');
        text = text.replace(/^[ \t]*####[ \t]+(.+?)[ \t]*$/gm, '<h4>$1</h4>');
        text = text.replace(/^[ \t]*###[ \t]+(.+?)[ \t]*$/gm, '<h4>$1</h4>');
        text = text.replace(/^[ \t]*##[ \t]+(.+?)[ \t]*$/gm, '<h3>$1</h3>');
        text = text.replace(/^[ \t]*#[ \t]+(.+?)[ \t]*$/gm, '<h3>$1</h3>');

        // 5. Blockquote
        text = text.replace(/^[ \t]*&gt;[ \t]?(.+)$/gm, '<blockquote>$1</blockquote>');

        // 6. Bullet points (•, -, *)
        text = text.replace(/^[ \t]*[•\-*][ \t]+(.+)$/gm, '<li>$1</li>');
        text = text.replace(/(<li>[\s\S]*?<\/li>)(?=\s*(?!<li>))/g, '<ul>$1</ul>');

        // 7. Bold **text**
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // 8. Italic *text* (avoid bold leftovers)
        text = text.replace(/(^|[^*])\*([^*\n]+?)\*(?!\*)/g, '$1<em>$2</em>');

        // 9. Inline code `code`
        text = text.replace(/`([^`\n]+)`/g, '<code>$1</code>');

        // 10. PRESERVE MULTIPLE SPACES
        text = text.replace(/\t/g, '    ');
        text = text.replace(/ {2,}/g, match => '&nbsp;'.repeat(match.length));

        // 11. Paragraph breaks: 2+ newlines
        text = text.replace(/\n{2,}/g, '<br><br>');

        // 12. Single newline → <br>
        text = text.replace(/\n/g, '<br>');

        // 13. Cleanup: <br> around block elements
        text = text.replace(/(<br>){2,}(<h[3-5]>)/g, '$2');
        text = text.replace(/(<\/h[3-5]>)(<br>){2,}/g, '$1<br>');
        text = text.replace(/(<br>){2,}(<hr>)/g, '$2');
        text = text.replace(/(<hr>)(<br>){2,}/g, '$1');
        text = text.replace(/(<br>){2,}(<ul>)/g, '$2');
        text = text.replace(/(<\/ul>)(<br>){2,}/g, '$1<br>');
        text = text.replace(/(<br>){4,}/g, '<br><br><br>');

        // 14. Trim leading <br>
        text = text.replace(/^(<br>)+/, '');

        return text;
    }

    // ============================================================
    // CHATBOT UI
    // ============================================================
    function initChatbot() {
        els = getElements();

        if (!hasAllElements(els)) {
            initAttempts++;
            console.log(`🤖 Chatbot: Elements not found (attempt ${initAttempts})`);
            if (initAttempts < 10) setTimeout(initChatbot, 500);
            return;
        }

        console.log('🤖 Chatbot: All elements found!');

        const subjectId = getCurrentSubjectId();
        loadSubject(subjectId);
        updateWelcome();
        updateStatus();

        setupSearchModeRadios();

        els.toggle.addEventListener('click', toggleChatbot);
        els.close.addEventListener('click', closeChatbot);
        els.send.addEventListener('click', sendMessage);
        els.clear.addEventListener('click', clearChat);
        els.input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        document.addEventListener('subjectchange', function(e) {
            const newSubject = e.detail?.subjectId;
            if (newSubject) {
                console.log(`🔄 Subject change: ${newSubject}`);
                loadSubject(newSubject);
                if (isOpen) {
                    updateWelcome();
                    addMessage(`🔄 Switched to: ${currentSubject}`, false);
                }
                updateStatus();
            }
        });

        document.addEventListener('click', function(e) {
            const tab = e.target.closest('.tab-main, .tab-sub');
            if (tab && tab.dataset.subject) {
                const newSubject = tab.dataset.subject;
                const current = getCurrentSubjectId();
                if (newSubject !== current) {
                    console.log(`🔄 Tab clicked: ${newSubject}`);
                    loadSubject(newSubject);
                    if (isOpen) {
                        updateWelcome();
                        addMessage(`🔄 Switched to: ${currentSubject}`, false);
                    }
                    updateStatus();
                }
            }
        });

        let lastSubject = getCurrentSubjectId();
        setInterval(function() {
            const current = getCurrentSubjectId();
            if (current !== lastSubject) {
                console.log(`🔄 Tab changed (polling): ${current}`);
                lastSubject = current;
                loadSubject(current);
                if (isOpen) {
                    updateWelcome();
                    addMessage(`🔄 Switched to: ${currentSubject}`, false);
                }
                updateStatus();
            }
        }, 1000);

        isReady = true;
        console.log('🤖 RAG Chatbot: Ready!');
    }

    // ============================================================
    // ✅ SEARCH MODE RADIOS — Auto inject
    // ============================================================
    function setupSearchModeRadios() {
        if (els.modeGlobal && els.modeHybrid) {
            bindModeRadios();
            return;
        }
        injectModeRadios();
    }

    function injectModeRadios() {
        if (!els.container) return;
        if (document.getElementById('chatbotModeSwitcher')) {
            els.modeGlobal = document.getElementById('chatbotModeGlobal');
            els.modeHybrid = document.getElementById('chatbotModeHybrid');
            bindModeRadios();
            return;
        }

        const header =
            els.container.querySelector('.chatbot-header') ||
            els.container.querySelector('.chatbot-title') ||
            els.container.firstElementChild;

        if (!header) {
            console.warn('⚠️ Chatbot header not found, radios skip');
            return;
        }

        const switcher = document.createElement('div');
        switcher.id = 'chatbotModeSwitcher';
        switcher.className = 'chatbot-mode-switcher';
        switcher.style.cssText = `
            display: flex;
            gap: 10px;
            align-items: center;
            padding: 6px 12px;
            margin: 4px 10px 6px 10px;
            font-size: 11px;
            color: #555;
            background: rgba(0,0,0,0.04);
            border-radius: 6px;
            flex-wrap: wrap;
            font-family: inherit;
        `;

        switcher.innerHTML = `
            <span style="font-weight:600;">🔍 Search:</span>
            <label style="display:flex;align-items:center;gap:4px;cursor:pointer;user-select:none;">
                <input type="radio" name="chatbotSearchMode" id="chatbotModeGlobal" value="global" style="cursor:pointer;margin:0;">
                🌐 All Subjects
            </label>
            <label style="display:flex;align-items:center;gap:4px;cursor:pointer;user-select:none;">
                <input type="radio" name="chatbotSearchMode" id="chatbotModeHybrid" value="hybrid" style="cursor:pointer;margin:0;">
                🔄 Current + Fallback
            </label>
        `;

        header.insertAdjacentElement('afterend', switcher);

        els.modeGlobal = document.getElementById('chatbotModeGlobal');
        els.modeHybrid = document.getElementById('chatbotModeHybrid');

        bindModeRadios();
        console.log('✅ Search mode radios injected');
    }

    function bindModeRadios() {
        const rg = els.modeGlobal;
        const rh = els.modeHybrid;
        if (!rg || !rh) return;

        if (searchMode === 'hybrid') rh.checked = true;
        else rg.checked = true;

        rg.addEventListener('change', () => {
            if (rg.checked) {
                searchMode = 'global';
                localStorage.setItem('chatbot_search_mode', 'global');
                console.log('🔧 Mode → Global (B)');
                updateStatus();
                updateWelcome();
            }
        });

        rh.addEventListener('change', () => {
            if (rh.checked) {
                searchMode = 'hybrid';
                localStorage.setItem('chatbot_search_mode', 'hybrid');
                console.log('🔧 Mode → Hybrid (C)');
                updateStatus();
                updateWelcome();
            }
        });
    }

    // ============================================================
    // STATUS / WELCOME / MESSAGES
    // ============================================================
    function updateStatus() {
        if (!els || !els.status) return;
        try {
            const modeLabel = searchMode === 'global' ? '🌐 Global' : '🔄 Hybrid';
            const docCount = searchMode === 'global'
                ? (allSubjectsLoaded ? allDocuments.length : '…')
                : documents.length;
            els.status.textContent = `${modeLabel} | ${docCount} docs | ${currentSubject}`;
            els.status.className = 'chatbot-status ready';
        } catch(e) {
            console.warn('Status update error:', e);
        }
    }

    function updateWelcome() {
        if (!els || !els.messages) return;
        try {
            els.messages.innerHTML = '';
            const modeLabel = searchMode === 'global'
                ? '🌐 Global (All Subjects)'
                : '🔄 Hybrid (Current → Global fallback)';

            const welcome = document.createElement('div');
            welcome.className = 'chatbot-msg ai';
            welcome.innerHTML = `
<strong>🤖 RAG Assistant</strong><br>
👋 I'm a RAG chatbot with LLM-style explanations!<br><br>
📚 <strong>Current Subject:</strong> ${currentSubject}<br>
📊 <strong>Docs (current tab):</strong> ${documents.length}<br>
🔍 <strong>Search Mode:</strong> ${modeLabel}<br><br>
💡 <strong>Try asking:</strong><br>
• What is [concept]?<br>
• Explain [topic]<br>
• How does [thing] work?<br>
• Applications of [concept]`;
            els.messages.appendChild(welcome);
            els.messages.scrollTop = 0;
        } catch(e) {
            console.warn('Welcome update error:', e);
        }
    }

    // ============================================================
    // ✅ ADD MESSAGE — PROPER SPACE & NEWLINE HANDLING
    // ============================================================
    function addMessage(text, isUser) {
        if (!els || !els.messages) return;
        try {
            const div = document.createElement('div');
            div.className = `chatbot-msg ${isUser ? 'user' : 'ai'}`;

            if (isUser) {
                // User messages: show exactly as typed (preserve spaces + newlines)
                div.textContent = text;
                div.style.whiteSpace = 'pre-wrap';
                div.style.wordBreak = 'break-word';
            } else {
                // AI messages: full markdown rendering
                div.innerHTML = renderMarkdown(text);
            }

            els.messages.appendChild(div);
            scrollToElement(div);
        } catch(e) {
            console.warn('Add message error:', e);
        }
    }

    function showTyping() {
        if (els && els.typing) {
            els.typing.classList.add('active');
            scrollToElement(els.typing);
        }
    }
    function hideTyping() { if (els && els.typing) els.typing.classList.remove('active'); }

    function toggleChatbot() {
        try {
            isOpen = !isOpen;
            els.container.classList.toggle('active', isOpen);
            els.toggle.innerHTML = isOpen ? '✕' : '💬';
            els.toggle.classList.toggle('active', isOpen);

            if (isOpen) {
                const subjectId = getCurrentSubjectId();
                loadSubject(subjectId);
                if (searchMode === 'global') loadAllSubjects();
                updateWelcome();
                updateStatus();
                setTimeout(() => { if (els.input) els.input.focus(); }, 100);
            }
        } catch(e) {
            console.warn('Toggle error:', e);
        }
    }

    function closeChatbot() {
        if (isOpen) {
            isOpen = false;
            els.container.classList.remove('active');
            els.toggle.innerHTML = '💬';
            els.toggle.classList.remove('active');
        }
    }

    async function sendMessage() {
        if (!els || !els.input) return;
        const message = els.input.value.trim();
        if (!message || isProcessing || !isReady) return;

        els.input.value = '';
        isProcessing = true;
        if (els.send) els.send.disabled = true;

        addMessage(message, true);
        showTyping();

        try {
            const result = performSearch(message);
            const docs = result.flat;
            const grouped = result.grouped;

            let finalResponse;

            if (docs.length > 0) {
                const { text: context, sources } = createContext(grouped);

                const formattedPrompt = `
You are an expert Electrical Engineering tutor. Answer the question based on the context provided.

**SEARCH MODE:** ${searchMode === 'global' ? 'Global (all subjects)' : 'Hybrid (current + fallback)'}
**SCOPE:** ${result.scopeLabel || ''}

**CONTEXT (organized by sub-tabs/topics):**
${context}

**QUESTION:**
${message}

**INSTRUCTIONS:**
1. Answer based ONLY on the context
2. Organize your answer SUB-TAB wise (each topic separately)
3. For each sub-tab, provide:
   - Sub-tab name as heading
   - Subject name (if multiple subjects present)
   - Concepts explained
   - Source citation
4. If context doesn't contain answer, say "I don't have enough information"
5. Provide detailed, educational explanation
6. Use headings and bullet points
7. Explain in simple terms
8. Include examples if available

**ANSWER:**
`;

                const llmResponse = await callMistralAPI(formattedPrompt);
                finalResponse = llmResponse;

                if (sources.length > 0) {
                    finalResponse += `\n\n---\n\n### 📂 Sub-tab Sources\n`;
                    for (const src of sources) finalResponse += `• ${src}\n`;
                }
            } else {
                finalResponse = generateFallbackResponse(message);
            }

            finalResponse += `\n\n📖 **Subject**: ${currentSubject}`;
            finalResponse += `\n🔍 **Mode**: ${result.scopeLabel || searchMode}`;

            hideTyping();
            addMessage(finalResponse, false);

        } catch (error) {
            hideTyping();
            addMessage(`❌ Error: ${error.message || 'Please try again.'}`, false);
        } finally {
            isProcessing = false;
            if (els.send) els.send.disabled = false;
            if (els.input) els.input.focus();
        }
    }

    function clearChat() {
        updateWelcome();
    }

    // ============================================================
    // START
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initChatbot, 300);
        });
    } else {
        setTimeout(initChatbot, 300);
    }

    console.log('🤖 RAG Chatbot: Script loaded');

})();
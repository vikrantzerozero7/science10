// configs/economics-config.js
window.ECONOMICS_CONFIG = {
    id: "economics",
    title: {
        english: "📊 Economics - Development, Sectors, Money, Globalisation & Consumer Rights",
        hindi: "📊 अर्थशास्त्र - विकास, क्षेत्रक, मुद्रा, वैश्वीकरण और उपभोक्ता अधिकार"
    },
    chapters: [
        // ===== CHAPTER 1: DEVELOPMENT =====
        {
            id: "eco_ch1",
            display_name: {
                english: "🌱 Development - Goals, Income & Sustainability",
                hindi: "🌱 विकास - लक्ष्य, आय और स्थिरता"
            },
            color: "#4CAF50",
            topics: [
                {
                    id: "eco_t1",
                    display_name: {
                        english: "📌 Developmental Goals & Income",
                        hindi: "📌 विकासात्मक लक्ष्य और आय"
                    },
                    concepts: [
                        {
                            id: "eco_c1",
                            display_name: {
                                english: "Developmental Goals - Different Perspectives",
                                hindi: "विकासात्मक लक्ष्य - विभिन्न दृष्टिकोण"
                            },
                            description: {
                                english: "1. Development means different things to different people .\n   - Landless labourers: more work, better wages, quality education .\n   - Prosperous farmers: higher support prices, cheap labour .\n   - Rural women: freedom, equality, education .\n\n2. Conflicting Goals:\n   - More dams (industrialists) vs displacement of tribals .\n   - Girl's freedom vs brother's household expectations .\n\n3. Beyond Income:\n   - Equal treatment, freedom, security, respect .\n   - Friendships, working atmosphere, job security .\n   - Dignity for women in paid work .\n\n4. National Development:\n   - Different and conflicting notions exist .\n   - Must benefit a large number of people .\n   - Fair and just path for all .",
                                hindi: "1. विकास का अर्थ अलग-अलग लोगों के लिए अलग-अलग होता है .\n   - भूमिहीन मजदूर: अधिक काम, बेहतर मजदूरी, गुणवत्तापूर्ण शिक्षा .\n   - समृद्ध किसान: अधिक समर्थन मूल्य, सस्ता श्रम .\n   - ग्रामीण महिलाएं: स्वतंत्रता, समानता, शिक्षा .\n\n2. विरोधाभासी लक्ष्य:\n   - अधिक बांध (उद्योगपति) बनाम विस्थापित आदिवासी .\n   - लड़की की स्वतंत्रता बनाम भाई की घरेलू अपेक्षाएँ .\n\n3. आय से परे:\n   - समान व्यवहार, स्वतंत्रता, सुरक्षा, सम्मान .\n   - मित्रता, कार्य वातावरण, नौकरी की सुरक्षा .\n   - वेतनभोगी कार्य में महिलाओं की प्रतिष्ठा .\n\n4. राष्ट्रीय विकास:\n   - विभिन्न और विरोधाभासी धारणाएँ मौजूद हैं .\n   - बड़ी संख्या में लोगों को लाभान्वित करना चाहिए .\n   - सभी के लिए निष्पक्ष और न्यायपूर्ण मार्ग ."
                            }
                        },
                        {
                            id: "eco_c2",
                            display_name: {
                                english: "Income & Other Criteria for Development",
                                hindi: "विकास के लिए आय और अन्य मानदंड"
                            },
                            description: {
                                english: "1. Per Capita Income (Average Income):\n   - Total income of country / Total population .\n   - World Bank classification (2024):\n     * High income: US$ 66,500+ per annum .\n     * Low income: US$ 2,300 or less .\n     * India: Low middle income (~US$ 11,000) .\n\n2. Limitations of Income Criterion:\n   - Hides disparities in distribution .\n   - Example: Country A (equal distribution) vs Country B (unequal) .\n   - Money cannot buy pollution-free environment or unadulterated medicines .\n\n3. Public Facilities:\n   - Cheaper to provide collectively .\n   - Examples: schools, healthcare, security .\n   - Collective provision improves quality of life .\n\n4. Health & Education Indicators:\n   - Infant Mortality Rate (IMR) .\n   - Literacy Rate .\n   - Net Attendance Ratio .\n   - Kerala: Better IMR (6) than Haryana (28) .\n   - Kerala: Literacy (94%) > Haryana (82%) .\n\n5. Human Development Index (HDI):\n   - Published by UNDP .\n   - Measures: educational levels, health status, per capita income .\n   - India rank: 130 out of 193 countries (2025) .",
                                hindi: "1. प्रति व्यक्ति आय (औसत आय):\n   - देश की कुल आय / कुल जनसंख्या .\n   - विश्व बैंक वर्गीकरण (2024):\n     * उच्च आय: US$ 66,500+ प्रति वर्ष .\n     * निम्न आय: US$ 2,300 या उससे कम .\n     * भारत: निम्न मध्यम आय (~US$ 11,000) .\n\n2. आय मानदंड की सीमाएँ:\n   - वितरण में असमानताओं को छुपाता है .\n   - उदाहरण: देश A (समान वितरण) बनाम देश B (असमान) .\n   - पैसा प्रदूषण-मुक्त वातावरण या शुद्ध दवाइयाँ नहीं खरीद सकता .\n\n3. सार्वजनिक सुविधाएँ:\n   - सामूहिक रूप से प्रदान करना सस्ता है .\n   - उदाहरण: स्कूल, स्वास्थ्य सेवा, सुरक्षा .\n   - सामूहिक प्रावधान जीवन की गुणवत्ता में सुधार करता है .\n\n4. स्वास्थ्य और शिक्षा संकेतक:\n   - शिशु मृत्यु दर (IMR) .\n   - साक्षरता दर .\n   - सकल उपस्थिति अनुपात .\n   - केरल: बेहतर IMR (6) बनाम हरियाणा (28) .\n   - केरल: साक्षरता (94%) > हरियाणा (82%) .\n\n5. मानव विकास सूचकांक (HDI):\n   - UNDP द्वारा प्रकाशित .\n   - माप: शैक्षिक स्तर, स्वास्थ्य स्थिति, प्रति व्यक्ति आय .\n   - भारत रैंक: 193 देशों में से 130 (2025) ."
                            }
                        },
                        {
                            id: "eco_c3",
                            display_name: {
                                english: "Sustainability of Development",
                                hindi: "विकास की स्थिरता"
                            },
                            description: {
                                english: "1. Renewable Resources:\n   - Replenished by nature (e.g., groundwater, crops) .\n   - Overuse leads to depletion .\n   - India: 300 districts with water level decline >4 metres .\n\n2. Non-Renewable Resources:\n   - Fixed stock, will exhaust over time .\n   - Crude oil reserves: 1732 billion barrels globally .\n   - Will last 50 years at current extraction rate .\n   - India imports oil, vulnerable to price hikes .\n\n3. Key Message:\n   - We have borrowed the earth from our children .\n   - Sustainability essential for future generations .",
                                hindi: "1. नवीकरणीय संसाधन:\n   - प्रकृति द्वारा पुनःपूर्ति (जैसे, भूजल, फसलें) .\n   - अत्यधिक उपयोग से कमी होती है .\n   - भारत: 300 जिलों में जल स्तर में गिरावट >4 मीटर .\n\n2. गैर-नवीकरणीय संसाधन:\n   - निश्चित भंडार, समय के साथ समाप्त हो जाएंगे .\n   - कच्चे तेल के भंडार: विश्व स्तर पर 1732 अरब बैरल .\n   - वर्तमान दर पर 50 वर्षों तक चलेगा .\n   - भारत तेल आयात करता है, मूल्य वृद्धि के प्रति संवेदनशील .\n\n3. मुख्य संदेश:\n   - हमने पृथ्वी अपने बच्चों से उधार ली है .\n   - भविष्य की पीढ़ियों के लिए स्थिरता आवश्यक है ."
                            }
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 2: SECTORS OF THE INDIAN ECONOMY =====
        {
            id: "eco_ch2",
            display_name: {
                english: "🏭 Sectors of the Indian Economy",
                hindi: "🏭 भारतीय अर्थव्यवस्था के क्षेत्रक"
            },
            color: "#FF9800",
            topics: [
                {
                    id: "eco_t2",
                    display_name: {
                        english: "📌 Classification of Economic Activities",
                        hindi: "📌 आर्थिक गतिविधियों का वर्गीकरण"
                    },
                    concepts: [
                        {
                            id: "eco_c4",
                            display_name: {
                                english: "Primary, Secondary & Tertiary Sectors",
                                hindi: "प्राथमिक, द्वितीयक और तृतीयक क्षेत्रक"
                            },
                            description: {
                                english: "1. Primary Sector (Agriculture & Related):\n   - Uses natural resources .\n   - Examples: agriculture, dairy, fishing, forestry, mining .\n   - Forms the base for all other products .\n\n2. Secondary Sector (Industrial):\n   - Manufacturing using primary goods as raw material .\n   - Examples: sugar mills, textile factories, brick kilns .\n   - Also called industrial sector .\n\n3. Tertiary Sector (Service):\n   - Produces services, not goods .\n   - Supports primary and secondary sectors .\n   - Examples: transport, storage, communication, banking, trade .\n   - Includes IT services, call centres, education, healthcare .\n\n4. Interdependence:\n   - Farmers supply sugarcane to mills .\n   - Transporters move goods from farms to cities .\n   - Farmers buy tractors, fertilisers from industry .",
                                hindi: "1. प्राथमिक क्षेत्रक (कृषि एवं संबद्ध):\n   - प्राकृतिक संसाधनों का उपयोग करता है .\n   - उदाहरण: कृषि, डेयरी, मत्स्य पालन, वानिकी, खनन .\n   - अन्य सभी उत्पादों का आधार बनाता है .\n\n2. द्वितीयक क्षेत्रक (औद्योगिक):\n   - प्राथमिक वस्तुओं को कच्चे माल के रूप में उपयोग कर विनिर्माण .\n   - उदाहरण: चीनी मिलें, कपड़ा कारखाने, ईंट भट्टे .\n   - औद्योगिक क्षेत्रक भी कहलाता है .\n\n3. तृतीयक क्षेत्रक (सेवा):\n   - वस्तुएँ नहीं, सेवाएँ उत्पन्न करता है .\n   - प्राथमिक और द्वितीयक क्षेत्रकों का समर्थन करता है .\n   - उदाहरण: परिवहन, भंडारण, संचार, बैंकिंग, व्यापार .\n   - इसमें IT सेवाएँ, कॉल सेंटर, शिक्षा, स्वास्थ्य सेवा शामिल हैं .\n\n4. परस्पर निर्भरता:\n   - किसान गन्ना मिलों को आपूर्ति करते हैं .\n   - परिवहनकर्ता फार्मों से शहरों तक माल पहुँचाते हैं .\n   - किसान उद्योग से ट्रैक्टर, उर्वरक खरीदते हैं ."
                            }
                        },
                        {
                            id: "eco_c5",
                            display_name: {
                                english: "GDP & Employment Trends in India",
                                hindi: "भारत में GDP और रोजगार के रुझान"
                            },
                            description: {
                                english: "1. Gross Domestic Product (GDP):\n   - Value of all final goods and services produced in a country during a year .\n   - Measured by Ministry of Statistics and Programme Implementation .\n   - Recent shift: GVA (Gross Value Added) at basic prices .\n\n2. Sectoral Share in GVA (2017-18):\n   - Primary: ~17-18% .\n   - Secondary: ~24-25% .\n   - Tertiary: ~57-58% (largest) .\n\n3. Employment Share (2017-18):\n   - Primary: ~44% (largest employer) .\n   - Secondary: ~24% .\n   - Tertiary: ~32% .\n\n4. Key Observations:\n   - Service sector grew 14 times (production) but only 5 times (employment) .\n   - Industrial output grew 9 times but employment only 3 times .\n   - Underemployment in agriculture: more people than necessary .",
                                hindi: "1. सकल घरेलू उत्पाद (GDP):\n   - किसी देश में एक वर्ष के दौरान उत्पादित सभी अंतिम वस्तुओं और सेवाओं का मूल्य .\n   - सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय द्वारा मापा जाता है .\n   - हालिया बदलाव: मूल कीमतों पर GVA (सकल मूल्य वर्धित) .\n\n2. GVA में क्षेत्रकीय हिस्सा (2017-18):\n   - प्राथमिक: ~17-18% .\n   - द्वितीयक: ~24-25% .\n   - तृतीयक: ~57-58% (सबसे बड़ा) .\n\n3. रोजगार हिस्सा (2017-18):\n   - प्राथमिक: ~44% (सबसे बड़ा नियोक्ता) .\n   - द्वितीयक: ~24% .\n   - तृतीयक: ~32% .\n\n4. मुख्य अवलोकन:\n   - सेवा क्षेत्रक 14 गुना बढ़ा (उत्पादन) लेकिन रोजगार केवल 5 गुना .\n   - औद्योगिक उत्पादन 9 गुना बढ़ा लेकिन रोजगार केवल 3 गुना .\n   - कृषि में अल्परोजगार: आवश्यकता से अधिक लोग ."
                            }
                        },
                        {
                            id: "eco_c6",
                            display_name: {
                                english: "Organised vs Unorganised Sector",
                                hindi: "संगठित बनाम असंगठित क्षेत्रक"
                            },
                            description: {
                                english: "1. Organised Sector:\n   - Registered with government .\n   - Regular employment, fixed hours, overtime pay .\n   - Benefits: paid leave, provident fund, gratuity, pension .\n   - Safe working environment, medical benefits .\n   - Examples: government jobs, large factories .\n\n2. Unorganised Sector:\n   - Small, scattered units, largely outside government control .\n   - Low-paid, irregular, no job security .\n   - No benefits: no paid leave, overtime, or pensions .\n   - Examples: street vendors, domestic workers, small farmers .\n\n3. Worker Distribution (Late 1990s):\n   - Total workers: ~397 million .\n   - Organised: ~28 million (~7%) .\n   - Unorganised: ~369 million (~93%) .\n   - In agriculture: ~92% in unorganised sector .\n\n4. Protection Needed:\n   - Rural: landless labourers, small farmers, artisans .\n   - Urban: small-scale workers, casual workers, street vendors .\n   - SC/ST/backward communities mostly in unorganised sector .",
                                hindi: "1. संगठित क्षेत्रक:\n   - सरकार के साथ पंजीकृत .\n   - नियमित रोजगार, निश्चित घंटे, अतिरिक्त समय का वेतन .\n   - लाभ: सवेतन अवकाश, भविष्य निधि, उपहार, पेंशन .\n   - सुरक्षित कार्य वातावरण, चिकित्सा लाभ .\n   - उदाहरण: सरकारी नौकरियाँ, बड़ी फैक्ट्रियाँ .\n\n2. असंगठित क्षेत्रक:\n   - छोटी, बिखरी हुई इकाइयाँ, सरकारी नियंत्रण से बाहर .\n   - कम वेतन, अनियमित, कोई नौकरी सुरक्षा नहीं .\n   - कोई लाभ नहीं: कोई भुगतान अवकाश, अतिरिक्त समय, या पेंशन नहीं .\n   - उदाहरण: सड़क विक्रेता, घरेलू कर्मचारी, छोटे किसान .\n\n3. श्रमिक वितरण (1990 के दशक के अंत में):\n   - कुल श्रमिक: ~397 मिलियन .\n   - संगठित: ~28 मिलियन (~7%) .\n   - असंगठित: ~369 मिलियन (~93%) .\n   - कृषि में: ~92% असंगठित क्षेत्रक में .\n\n4. सुरक्षा की आवश्यकता:\n   - ग्रामीण: भूमिहीन मजदूर, छोटे किसान, कारीगर .\n   - शहरी: लघु-उद्योग श्रमिक, अनियत श्रमिक, सड़क विक्रेता .\n   - अनुसूचित जाति/जनजाति/पिछड़े समुदाय अधिकतर असंगठित क्षेत्रक में ."
                            }
                        },
                        {
                            id: "eco_c7",
                            display_name: {
                                english: "Public vs Private Sector & Employment Generation",
                                hindi: "सार्वजनिक बनाम निजी क्षेत्रक और रोजगार सृजन"
                            },
                            description: {
                                english: "1. Public Sector:\n   - Government owns assets and provides services .\n   - Purpose: not just profit, but social welfare .\n   - Examples: Railways, post offices, electricity .\n   - Focus: heavy spending, infrastructure, social services .\n\n2. Private Sector:\n   - Ownership by individuals or companies .\n   - Motive: earn profits .\n   - Examples: TISCO, Reliance Industries .\n\n3. Government Role:\n   - Provides basic services: health, education, infrastructure .\n   - Supports farmers (fair prices, ration shops) .\n   - Protects small-scale industries .\n   - MGNREGA 2005: 100 days guaranteed employment in rural areas .\n   - Viksit Bharat-G RAM G 2025 (replacement) .\n\n4. Employment Creation:\n   - Irrigation projects (canals, wells) .\n   - Transportation and storage facilities .\n   - Cheap credit from banks .\n   - Industries and services in semi-rural areas .",
                                hindi: "1. सार्वजनिक क्षेत्रक:\n   - सरकार के पास संपत्ति और सेवाएँ .\n   - उद्देश्य: केवल लाभ नहीं, बल्कि सामाजिक कल्याण .\n   - उदाहरण: रेलवे, डाकघर, बिजली .\n   - फोकस: भारी खर्च, बुनियादी ढाँचा, सामाजिक सेवाएँ .\n\n2. निजी क्षेत्रक:\n   - व्यक्तियों या कंपनियों का स्वामित्व .\n   - उद्देश्य: लाभ कमाना .\n   - उदाहरण: टिस्को, रिलायंस इंडस्ट्रीज .\n\n3. सरकार की भूमिका:\n   - बुनियादी सेवाएँ प्रदान करना: स्वास्थ्य, शिक्षा, बुनियादी ढाँचा .\n   - किसानों का समर्थन (उचित मूल्य, राशन की दुकानें) .\n   - लघु उद्योगों की सुरक्षा .\n   - MGNREGA 2005: ग्रामीण क्षेत्रों में 100 दिन की गारंटीशुदा रोजगार .\n   - विकसित भारत-G RAM G 2025 (प्रतिस्थापन) .\n\n4. रोजगार सृजन:\n   - सिंचाई परियोजनाएँ (नहरें, कुएँ) .\n   - परिवहन और भंडारण सुविधाएँ .\n   - बैंकों से सस्ता ऋण .\n   - अर्ध-ग्रामीण क्षेत्रों में उद्योग और सेवाएँ ."
                            }
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 3: MONEY AND CREDIT =====
        {
            id: "eco_ch3",
            display_name: {
                english: "💰 Money & Credit - Banking & Loans",
                hindi: "💰 मुद्रा और ऋण - बैंकिंग और ऋण"
            },
            color: "#9C27B0",
            topics: [
                {
                    id: "eco_t3",
                    display_name: {
                        english: "📌 Money, Banking & Credit",
                        hindi: "📌 मुद्रा, बैंकिंग और ऋण"
                    },
                    concepts: [
                        {
                            id: "eco_c8",
                            display_name: {
                                english: "Money as a Medium of Exchange",
                                hindi: "विनिमय के माध्यम के रूप में मुद्रा"
                            },
                            description: {
                                english: "1. Barter System:\n   - Direct exchange of goods .\n   - Requires double coincidence of wants .\n\n2. Modern Money:\n   - Currency (paper notes and coins) .\n   - Authorised by government .\n   - Reserve Bank of India issues currency .\n\n3. Demand Deposits:\n   - Deposits with banks that can be withdrawn on demand .\n   - Cheques enable payments without cash .\n   - Examples: salaries deposited in bank accounts .\n\n4. Modern Money Features:\n   - Currency is not made of precious metal .\n   - Legal tender: cannot be refused in transactions .",
                                hindi: "1. वस्तु विनिमय प्रणाली:\n   - वस्तुओं का सीधा आदान-प्रदान .\n   - इच्छाओं के दोहरे संयोग की आवश्यकता होती है .\n\n2. आधुनिक मुद्रा:\n   - मुद्रा (कागजी नोट और सिक्के) .\n   - सरकार द्वारा अधिकृत .\n   - भारतीय रिजर्व बैंक मुद्रा जारी करता है .\n\n3. मांग जमा:\n   - बैंकों में जमा जिन्हें मांग पर निकाला जा सकता है .\n   - चेक बिना नकदी के भुगतान सक्षम बनाते हैं .\n   - उदाहरण: बैंक खातों में जमा वेतन .\n\n4. आधुनिक मुद्रा की विशेषताएँ:\n   - मुद्रा कीमती धातु से नहीं बनी होती .\n   - वैध मुद्रा: लेन-देन में मना नहीं किया जा सकता ."
                            }
                        },
                        {
                            id: "eco_c9",
                            display_name: {
                                english: "Banking & Loan Activities",
                                hindi: "बैंकिंग और ऋण गतिविधियाँ"
                            },
                            description: {
                                english: "1. Bank Functions:\n   - Accept deposits, pay interest .\n   - Keep 5% cash reserve (provision) .\n   - Use major portion for loans .\n   - Charge higher interest on loans than on deposits .\n\n2. Credit (Loan) Impact:\n   - Positive: helps increase earnings (Salim's example) .\n   - Negative: debt-trap (Swapna's example) .\n\n3. Terms of Credit:\n   - Interest rate .\n   - Collateral (security) .\n   - Documentation requirements .\n   - Repayment terms .\n\n4. Formal vs Informal Sector Credit (2019 NSSO):\n   - Formal: Banks, Cooperatives .\n   - Informal: Moneylenders, traders, employers .\n   - Rich households: 83% formal credit .\n   - Poor households: 54% informal credit .\n   - Rural: formal sector meets ~50% of credit needs .",
                                hindi: "1. बैंक कार्य:\n   - जमा स्वीकार करना, ब्याज देना .\n   - 5% नकद आरक्षित रखना (प्रावधान) .\n   - अधिकांश हिस्सा ऋण के लिए उपयोग करना .\n   - ऋण पर जमा से अधिक ब्याज लेना .\n\n2. ऋण (क्रेडिट) का प्रभाव:\n   - सकारात्मक: आय बढ़ाने में मदद (सलीम का उदाहरण) .\n   - नकारात्मक: ऋण-जाल (स्वप्ना का उदाहरण) .\n\n3. ऋण की शर्तें:\n   - ब्याज दर .\n   - संपार्श्विक (सुरक्षा) .\n   - दस्तावेज़ीकरण आवश्यकताएँ .\n   - पुनर्भुगतान की शर्तें .\n\n4. औपचारिक बनाम अनौपचारिक क्षेत्रक ऋण (2019 NSSO):\n   - औपचारिक: बैंक, सहकारी समितियाँ .\n   - अनौपचारिक: साहूकार, व्यापारी, नियोक्ता .\n   - समृद्ध घर: 83% औपचारिक ऋण .\n   - गरीब घर: 54% अनौपचारिक ऋण .\n   - ग्रामीण: औपचारिक क्षेत्रक ~50% ऋण आवश्यकताओं को पूरा करता है ."
                            }
                        },
                        {
                            id: "eco_c10",
                            display_name: {
                                english: "Self-Help Groups (SHGs) & Grameen Bank",
                                hindi: "स्वयं सहायता समूह (SHG) और ग्रामीण बैंक"
                            },
                            description: {
                                english: "1. Self-Help Groups (SHGs):\n   - 15-20 members (usually women) .\n   - Regular savings (Rs 25-100 per member) .\n   - Provide small loans to members .\n   - Become eligible for bank loans after 1-2 years .\n   - Overcome lack of collateral .\n\n2. SHG Benefits:\n   - Timely loans at reasonable rates .\n   - Financial self-reliance for women .\n   - Platform to discuss social issues (health, nutrition, domestic violence) .\n\n3. Grameen Bank (Bangladesh):\n   - Started in 1970s .\n   - 9+ million members (2018) .\n   - 81,600 villages .\n   - Almost all borrowers are women from poorest sections .\n   - Founder: Muhammad Yunus (Nobel Prize 2006) .",
                                hindi: "1. स्वयं सहायता समूह (SHG):\n   - 15-20 सदस्य (आमतौर पर महिलाएँ) .\n   - नियमित बचत (प्रति सदस्य Rs 25-100) .\n   - सदस्यों को छोटे ऋण प्रदान करना .\n   - 1-2 वर्षों के बाद बैंक ऋण के लिए पात्र होना .\n   - संपार्श्विक की कमी को दूर करना .\n\n2. SHG लाभ:\n   - उचित दरों पर समय पर ऋण .\n   - महिलाओं के लिए वित्तीय आत्मनिर्भरता .\n   - सामाजिक मुद्दों पर चर्चा के लिए मंच (स्वास्थ्य, पोषण, घरेलू हिंसा) .\n\n3. ग्रामीण बैंक (बांग्लादेश):\n   - 1970 के दशक में शुरू हुआ .\n   - 9+ मिलियन सदस्य (2018) .\n   - 81,600 गाँव .\n   - लगभग सभी उधारकर्ता गरीब वर्ग की महिलाएँ हैं .\n   - संस्थापक: मुहम्मद युनूस (नोबेल पुरस्कार 2006) ."
                            }
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 4: GLOBALISATION AND THE INDIAN ECONOMY =====
        {
            id: "eco_ch4",
            display_name: {
                english: "🌐 Globalisation & The Indian Economy",
                hindi: "🌐 वैश्वीकरण और भारतीय अर्थव्यवस्था"
            },
            color: "#2196F3",
            topics: [
                {
                    id: "eco_t4",
                    display_name: {
                        english: "📌 Globalisation, Trade & MNCs",
                        hindi: "📌 वैश्वीकरण, व्यापार और बहुराष्ट्रीय कंपनियाँ"
                    },
                    concepts: [
                        {
                            id: "eco_c11",
                            display_name: {
                                english: "Multinational Corporations (MNCs) & Foreign Trade",
                                hindi: "बहुराष्ट्रीय निगम (MNC) और विदेशी व्यापार"
                            },
                            description: {
                                english: "1. Multinational Corporations (MNCs):\n   - Owns/controls production in more than one country .\n   - Set up offices/factories in regions with cheap labour .\n   - Examples: Ford Motors, Cargill Foods .\n\n2. Ways MNCs Control Production:\n   - Set up partnerships with local companies .\n   - Buy up local companies (Cargill buys Parakh Foods) .\n   - Place orders with small producers (garments, footwear) .\n   - Compete with or buy local companies .\n\n3. Foreign Investment:\n   - Money spent to buy assets (land, buildings, machines) .\n   - Investment by MNCs called foreign investment .\n   - Ford Motors invested ₹1700 crore in India (1995) .\n\n4. Foreign Trade:\n   - Creates opportunity for producers to reach beyond domestic markets .\n   - Expands choice for buyers .\n   - Example: Chinese toys in India (70-80% market) .",
                                hindi: "1. बहुराष्ट्रीय निगम (MNC):\n   - एक से अधिक देशों में उत्पादन का स्वामित्व/नियंत्रण .\n   - सस्ते श्रम वाले क्षेत्रों में कार्यालय/कारखाने स्थापित करना .\n   - उदाहरण: फोर्ड मोटर्स, कारगिल फूड्स .\n\n2. MNC उत्पादन नियंत्रण के तरीके:\n   - स्थानीय कंपनियों के साथ साझेदारी स्थापित करना .\n   - स्थानीय कंपनियों को खरीदना (कारगिल ने पारख फूड्स खरीदा) .\n   - छोटे उत्पादकों को ऑर्डर देना (कपड़े, जूते) .\n   - स्थानीय कंपनियों के साथ प्रतिस्पर्धा करना या उन्हें खरीदना .\n\n3. विदेशी निवेश:\n   - संपत्ति खरीदने पर खर्च की गई राशि (भूमि, भवन, मशीनें) .\n   - MNC द्वारा निवेश को विदेशी निवेश कहा जाता है .\n   - फोर्ड मोटर्स ने भारत में ₹1700 करोड़ का निवेश किया (1995) .\n\n4. विदेशी व्यापार:\n   - उत्पादकों को घरेलू बाजार से परे पहुँचने का अवसर देता है .\n   - खरीदारों के लिए विकल्प बढ़ाता है .\n   - उदाहरण: भारत में चीनी खिलौने (70-80% बाजार) ."
                            }
                        },
                        {
                            id: "eco_c12",
                            display_name: {
                                english: "Globalisation: Factors, Impact & WTO",
                                hindi: "वैश्वीकरण: कारक, प्रभाव और WTO"
                            },
                            description: {
                                english: "1. Globalisation:\n   - Rapid integration/interconnection between countries .\n   - Driven by MNCs, foreign trade, and foreign investment .\n\n2. Technology Factors:\n   - Improvements in transportation: containers, air transport .\n   - Information & Communication Technology (IT): telecom, internet, e-mail .\n   - IT enables global production (magazine designing in Delhi for London) .\n\n3. Liberalisation:\n   - Removing barriers to trade and investment .\n   - India started liberalising in 1991 .\n   - Allowed foreign companies to set up factories in India .\n\n4. World Trade Organisation (WTO):\n   - Aim: liberalise international trade .\n   - Establishes rules for international trade .\n   - ~160 member countries .\n   - Criticism: Developed countries retain trade barriers .\n\n5. Impact of Globalisation in India:\n   - Positive: greater choice, improved quality, lower prices .\n   - New jobs in industries like IT, cell phones, automobiles .\n   - Some Indian companies became MNCs (Tata Motors, Infosys) .\n   - Negative: small producers affected (Ravi's capacitor unit) .\n   - Workers face uncertain employment, low wages, long hours .",
                                hindi: "1. वैश्वीकरण:\n   - देशों के बीच तीव्र एकीकरण/अंतर्संबंध .\n   - MNC, विदेशी व्यापार और विदेशी निवेश द्वारा संचालित .\n\n2. प्रौद्योगिकी कारक:\n   - परिवहन में सुधार: कंटेनर, हवाई परिवहन .\n   - सूचना एवं संचार प्रौद्योगिकी (IT): दूरसंचार, इंटरनेट, ई-मेल .\n   - IT वैश्विक उत्पादन को सक्षम बनाता है (लंदन के लिए दिल्ली में पत्रिका डिजाइन) .\n\n3. उदारीकरण:\n   - व्यापार और निवेश में बाधाओं को हटाना .\n   - भारत ने 1991 में उदारीकरण शुरू किया .\n   - विदेशी कंपनियों को भारत में कारखाने स्थापित करने की अनुमति दी .\n\n4. विश्व व्यापार संगठन (WTO):\n   - उद्देश्य: अंतर्राष्ट्रीय व्यापार को उदार बनाना .\n   - अंतर्राष्ट्रीय व्यापार के लिए नियम स्थापित करना .\n   - ~160 सदस्य देश .\n   - आलोचना: विकसित देशों ने व्यापार बाधाओं को बनाए रखा है .\n\n5. भारत में वैश्वीकरण का प्रभाव:\n   - सकारात्मक: अधिक विकल्प, बेहतर गुणवत्ता, कम कीमतें .\n   - IT, मोबाइल फोन, ऑटोमोबाइल जैसे उद्योगों में नई नौकरियाँ .\n   - कुछ भारतीय कंपनियाँ MNC बन गईं (टाटा मोटर्स, इंफोसिस) .\n   - नकारात्मक: छोटे उत्पादक प्रभावित (रवि की कैपेसिटर इकाई) .\n   - श्रमिकों को अनिश्चित रोजगार, कम मजदूरी, लंबे घंटे का सामना करना पड़ता है ."
                            }
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 5: CONSUMER RIGHTS =====
        {
            id: "eco_ch5",
            display_name: {
                english: "🛡️ Consumer Rights - Protection & Redressal",
                hindi: "🛡️ उपभोक्ता अधिकार - संरक्षण और निवारण"
            },
            color: "#E91E63",
            topics: [
                {
                    id: "eco_t5",
                    display_name: {
                        english: "📌 Consumer Rights & Protection",
                        hindi: "📌 उपभोक्ता अधिकार और संरक्षण"
                    },
                    concepts: [
                        {
                            id: "eco_c13",
                            display_name: {
                                english: "Consumer Exploitation & Movement",
                                hindi: "उपभोक्ता शोषण और आंदोलन"
                            },
                            description: {
                                english: "1. Exploitation in Marketplace:\n   - Underweight goods .\n   - Hidden charges .\n   - Adulterated/defective goods .\n   - False information through media .\n   - Example: baby milk powder misleading marketing .\n\n2. Consumer Movement Origin (India):\n   - 1960s: food shortages, hoarding, black marketing, adulteration .\n   - 1970s: consumer groups writing articles, holding exhibitions .\n   - Focus: malpractices in ration shops, road transport .\n\n3. Consumer Protection Act (COPRA) 1986:\n   - Enacted by Indian Parliament on 24 December .\n   - National Consumers' Day: 24 December .\n   - Amended in 2019 .\n\n4. Consumer Rights:\n   - Right to choice .\n   - Right to information .\n   - Right to redressal .\n   - Right to safety .\n   - Right to representation .\n   - Right to consumer education .",
                                hindi: "1. बाजार में शोषण:\n   - कम वजन वाली वस्तुएँ .\n   - छिपे हुए शुल्क .\n   - मिलावटी/दोषपूर्ण वस्तुएँ .\n   - मीडिया के माध्यम से गलत सूचना .\n   - उदाहरण: शिशु दूध पाउडर का भ्रामक विपणन .\n\n2. उपभोक्ता आंदोलन की उत्पत्ति (भारत):\n   - 1960 के दशक: खाद्य कमी, जमाखोरी, कालाबाजारी, मिलावट .\n   - 1970 के दशक: उपभोक्ता समूहों द्वारा लेख लिखना, प्रदर्शनियाँ लगाना .\n   - फोकस: राशन की दुकानों, सड़क परिवहन में कदाचार .\n\n3. उपभोक्ता संरक्षण अधिनियम (COPRA) 1986:\n   - भारतीय संसद द्वारा 24 दिसंबर को अधिनियमित .\n   - राष्ट्रीय उपभोक्ता दिवस: 24 दिसंबर .\n   - 2019 में संशोधित .\n\n4. उपभोक्ता अधिकार:\n   - विकल्प का अधिकार .\n   - सूचना का अधिकार .\n   - निवारण का अधिकार .\n   - सुरक्षा का अधिकार .\n   - प्रतिनिधित्व का अधिकार .\n   - उपभोक्ता शिक्षा का अधिकार ."
                            }
                        },
                        {
                            id: "eco_c14",
                            display_name: {
                                english: "Redressal Mechanisms & Quality Standards",
                                hindi: "निवारण तंत्र और गुणवत्ता मानक"
                            },
                            description: {
                                english: "1. Consumer Disputes Redressal Commissions:\n   - District Commission: claims up to ₹1 crore .\n   - State Commission: ₹1 crore to ₹10 crore .\n   - National Commission: claims exceeding ₹10 crore .\n\n2. Consumer Forums/Councils:\n   - Guide consumers on filing cases .\n   - Represent individual consumers .\n   - Receive financial support from government .\n\n3. Quality Standards:\n   - ISI (Indian Standards Institute) .\n   - Agmark (agricultural products) .\n   - Hallmark (jewellery) .\n   - ISO (International Organisation for Standardisation) .\n   - Mandatory for mass consumption products (LPG, cement, drinking water) .\n\n4. RTI Act (Right to Information) 2005:\n   - Ensures citizens get information about government functions .\n   - Example: Amritha got job result through RTI .\n\n5. Challenges:\n   - Cumbersome, expensive, time-consuming process .\n   - Cash memos not issued, evidence hard to gather .\n   - Only 50-60 well-organised consumer groups in India .",
                                hindi: "1. उपभोक्ता विवाद निवारण आयोग:\n   - जिला आयोग: ₹1 करोड़ तक के दावे .\n   - राज्य आयोग: ₹1 करोड़ से ₹10 करोड़ तक .\n   - राष्ट्रीय आयोग: ₹10 करोड़ से अधिक के दावे .\n\n2. उपभोक्ता मंच/परिषदें:\n   - मामले दायर करने में उपभोक्ताओं का मार्गदर्शन करना .\n   - व्यक्तिगत उपभोक्ताओं का प्रतिनिधित्व करना .\n   - सरकार से वित्तीय सहायता प्राप्त करना .\n\n3. गुणवत्ता मानक:\n   - ISI (भारतीय मानक संस्थान) .\n   - Agmark (कृषि उत्पाद) .\n   - हॉलमार्क (आभूषण) .\n   - ISO (अंतर्राष्ट्रीय मानकीकरण संगठन) .\n   - बड़े पैमाने पर उपभोग उत्पादों के लिए अनिवार्य (LPG, सीमेंट, पेयजल) .\n\n4. RTI अधिनियम (सूचना का अधिकार) 2005:\n   - नागरिकों को सरकारी कार्यों के बारे में जानकारी प्राप्त करने का अधिकार देता है .\n   - उदाहरण: अमृता को RTI के माध्यम से नौकरी का परिणाम मिला .\n\n5. चुनौतियाँ:\n   - कठिन, महंगी, समय लेने वाली प्रक्रिया .\n   - नकद बिल जारी नहीं होते, साक्ष्य जुटाना मुश्किल .\n   - भारत में केवल 50-60 सुव्यवस्थित उपभोक्ता समूह ."
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
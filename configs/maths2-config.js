// configs/mathematics-config.js
window.MATHEMATICS2_CONFIG = {
    id: "mathematics2",
    title: {
        english: "📐 Mathematics - Real Numbers, Polynomials, Linear Equations, Quadratic Equations, AP, Triangles & Coordinate Geometry",
        hindi: "📐 गणित - वास्तविक संख्याएँ, बहुपद, रैखिक समीकरण, द्विघात समीकरण, AP, त्रिभुज और निर्देशांक ज्यामिति"
    },
    chapters: [
        // ===== CHAPTER 1: REAL NUMBERS =====
        {
            id: "math_ch1_20261026_120000",
            display_name: {
                english: "🔢 Real Numbers - Euclid's Algorithm & Fundamental Theorem",
                hindi: "🔢 वास्तविक संख्याएँ - Euclid's Algorithm और Fundamental Theorem"
            },
            color: "#FF6B6B",
            topics: [
                {
                    id: "math_t1_20261026_120000",
                    display_name: {
                        english: "📘 Fundamental Theorem of Arithmetic & Irrational Numbers",
                        hindi: "📘 Fundamental Theorem of Arithmetic और Irrational Numbers"
                    },
                    concepts: [
                        {
                            id: "math_c1_20261026_120000",
                            display_name: {
                                english: "Fundamental Theorem of Arithmetic",
                                hindi: "Fundamental Theorem of Arithmetic"
                            },
                            description: {
                                english: "1. Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur.\n\n2. Example: 32760 = 2³ × 3² × 5 × 7 × 13.\n\n3. Example: 123456789 = 3² × 3803 × 3607.\n\n4. HCF(a, b) = Product of the smallest power of each common prime factor in the numbers.\n\n5. LCM(a, b) = Product of the greatest power of each prime factor, involved in the numbers.\n\n6. For any two positive integers a and b: HCF(a, b) × LCM(a, b) = a × b.\n\n7. For three numbers p, q, r: LCM(p,q,r) = p·q·r·HCF(p,q,r) / [HCF(p,q)·HCF(q,r)·HCF(p,r)].\n\n8. For three numbers p, q, r: HCF(p,q,r) = p·q·r·LCM(p,q,r) / [LCM(p,q)·LCM(q,r)·LCM(p,r)].\n\n9. Remark: HCF(p,q,r) × LCM(p,q,r) ≠ p × q × r for three numbers.\n\nKeywords: fundamental theorem, prime factorisation, HCF, LCM, composite number, unique factorisation, Euclid"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c2_20261026_120000",
                            display_name: {
                                english: "Irrational Numbers - Proofs & Theorems",
                                hindi: "Irrational Numbers - Proofs और Theorems"
                            },
                            description: {
                                english: "1. A number 's' is called irrational if it cannot be written in the form p/q where p and q are integers and q ≠ 0.\n\n2. Examples: √2, √3, √15, π, -√2/√3, 0.10110111011110...\n\n3. Theorem 1.2: Let p be a prime number. If p divides a², then p divides a, where a is a positive integer.\n\n4. Theorem 1.3: √2 is irrational (proved by contradiction).\n\n5. √3 is irrational (proved by contradiction).\n\n6. 5 - √3 is irrational.\n\n7. 3√2 is irrational.\n\n8. The sum or difference of a rational and an irrational number is irrational.\n\n9. The product and quotient of a non-zero rational and irrational number is irrational.\n\nKeywords: irrational numbers, proof by contradiction, prime divisor, square root, rational, real numbers"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c3_20261026_120000",
                            display_name: {
                                english: "Solved Examples - Real Numbers",
                                hindi: "हल किए गए उदाहरण - Real Numbers"
                            },
                            description: {
                                english: "Example 1: Consider 4ⁿ, where n is a natural number. Check whether there is any value of n for which 4ⁿ ends with the digit zero.\nSolution: 4ⁿ = (2)²ⁿ; the only prime in the factorisation is 2. Since 5 is not a factor, 4ⁿ cannot end with digit zero. No such n exists.\n\nExample 2: Find LCM and HCF of 6 and 20 by prime factorisation.\nSolution: 6 = 2¹ × 3¹; 20 = 2² × 5¹.\nHCF(6, 20) = 2¹ = 2.\nLCM(6, 20) = 2² × 3¹ × 5¹ = 60.\nVerify: HCF × LCM = 2 × 60 = 120 = 6 × 20.\n\nExample 3: Find HCF of 96 and 404 by prime factorisation. Hence find LCM.\nSolution: 96 = 2⁵ × 3; 404 = 2² × 101.\nHCF = 2² = 4.\nLCM = (96 × 404) / 4 = 9696.\n\nExample 4: Find HCF and LCM of 6, 72 and 120.\nSolution: 6 = 2 × 3; 72 = 2³ × 3²; 120 = 2³ × 3 × 5.\nHCF = 2¹ × 3¹ = 6.\nLCM = 2³ × 3² × 5¹ = 360.\nNote: 6 × 72 × 120 ≠ HCF × LCM.\n\nKeywords: HCF, LCM, prime factorisation, examples, 4ⁿ, digit zero, verify"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 2: POLYNOMIALS =====
        {
            id: "math_ch2_20261026_120000",
            display_name: {
                english: "📈 Polynomials - Zeroes & Coefficients",
                hindi: "📈 बहुपद - Zeroes और Coefficients"
            },
            color: "#4ECDC4",
            topics: [
                {
                    id: "math_t2_20261026_120000",
                    display_name: {
                        english: "📐 Types of Polynomials & Geometrical Meaning",
                        hindi: "📐 बहुपद के प्रकार और Geometrical Meaning"
                    },
                    concepts: [
                        {
                            id: "math_c4_20261026_120000",
                            display_name: {
                                english: "Polynomial Basics & Degrees",
                                hindi: "बहुपद मूल बातें और Degrees"
                            },
                            description: {
                                english: "1. If p(x) is a polynomial in x, the highest power of x in p(x) is called the degree of the polynomial p(x).\n\n2. Linear polynomial: degree 1, form ax + b, a ≠ 0. Examples: 2x - 3, √3x + 5, y + √2.\n\n3. Quadratic polynomial: degree 2, form ax² + bx + c, a ≠ 0. Examples: 2x² + 3x - 2/5, y² - 2, 2 - x² + √3x.\n\n4. Cubic polynomial: degree 3, form ax³ + bx² + cx + d, a ≠ 0.\n\n5. A real number k is said to be a zero of a polynomial p(x), if p(k) = 0.\n\n6. The zero of the linear polynomial ax + b is -b/a = -(Constant term)/(Coefficient of x).\n\n7. A polynomial of degree n has at most n zeroes.\n\n8. Geometrically, the zeroes of a polynomial p(x) are precisely the x-coordinates of the points where the graph of y = p(x) intersects the x-axis.\n\nKeywords: polynomial, degree, linear, quadratic, cubic, zeroes, graph, x-axis"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c5_20261026_120000",
                            display_name: {
                                english: "Relationship Between Zeroes & Coefficients",
                                hindi: "Zeroes और Coefficients के बीच संबंध"
                            },
                            description: {
                                english: "1. For quadratic polynomial p(x) = ax² + bx + c, a ≠ 0, with zeroes α and β:\nSum of zeroes = α + β = -b/a = -(Coefficient of x)/(Coefficient of x²).\nProduct of zeroes = αβ = c/a = (Constant term)/(Coefficient of x²).\n\n2. For cubic polynomial p(x) = ax³ + bx² + cx + d, with zeroes α, β, γ:\nα + β + γ = -b/a\nαβ + βγ + γα = c/a\nαβγ = -d/a\n\n3. Example: For 2x² - 8x + 6, zeroes are 1 and 3. Sum = 4 = -(-8)/2; Product = 3 = 6/2.\n\n4. Example: For 3x² + 5x - 2, zeroes are 1/3 and -2. Sum = -5/3; Product = -2/3.\n\n5. A quadratic polynomial with given sum S and product P of zeroes is k(x² - Sx + P), where k is real.\n\n6. Example: Sum = -3, Product = 2 → polynomial x² + 3x + 2.\n\nKeywords: zeroes, coefficients, sum, product, quadratic, cubic, alpha, beta, gamma"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c6_20261026_120000",
                            display_name: {
                                english: "Solved Examples - Polynomials",
                                hindi: "हल किए गए उदाहरण - बहुपद"
                            },
                            description: {
                                english: "Example 1: Find zeroes of x² + 7x + 10 and verify relationship.\nSolution: x² + 7x + 10 = (x + 2)(x + 5). Zeroes are -2 and -5.\nSum = -7 = -(-7)/1; Product = 10 = 10/1.\n\nExample 2: Find zeroes of x² - 3 and verify.\nSolution: x² - 3 = (x - √3)(x + √3). Zeroes are √3 and -√3.\nSum = 0 = -0/1; Product = -3 = -3/1.\n\nExample 3: Find a quadratic polynomial with sum -3 and product 2.\nSolution: Polynomial is x² + 3x + 2.\n\nExample 4: Verify that 3, -1, -1/3 are zeroes of p(x) = 3x³ - 5x² - 11x - 3.\nSolution: p(3) = 0, p(-1) = 0, p(-1/3) = 0. Verified.\nSum = 5/3 = -(-5)/3; αβ + βγ + γα = -11/3; αβγ = 1 = -(-3)/3.\n\nKeywords: zeroes, verify, quadratic, cubic, sum, product, examples, polynomial"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 3: PAIR OF LINEAR EQUATIONS =====
        {
            id: "math_ch3_20261026_120000",
            display_name: {
                english: "📊 Pair of Linear Equations in Two Variables",
                hindi: "📊 दो चरों में रैखिक समीकरणों का युग्म"
            },
            color: "#FFE66D",
            topics: [
                {
                    id: "math_t3_20261026_120000",
                    display_name: {
                        english: "📉 Graphical & Algebraic Methods",
                        hindi: "📉 Graphical और Algebraic Methods"
                    },
                    concepts: [
                        {
                            id: "math_c7_20261026_120000",
                            display_name: {
                                english: "Graphical Method & Consistency",
                                hindi: "Graphical Method और Consistency"
                            },
                            description: {
                                english: "1. General form: a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0.\n\n2. Intersecting lines: a₁/a₂ ≠ b₁/b₂. Unique solution. Consistent pair.\n\n3. Coincident lines: a₁/a₂ = b₁/b₂ = c₁/c₂. Infinitely many solutions. Dependent (consistent) pair.\n\n4. Parallel lines: a₁/a₂ = b₁/b₂ ≠ c₁/c₂. No solution. Inconsistent pair.\n\n5. A pair of linear equations which has no solution is called an inconsistent pair.\n\n6. A pair of linear equations which has a solution is called a consistent pair.\n\n7. A dependent pair of linear equations is always consistent.\n\n8. Example: x - 2y = 0 and 3x + 4y - 20 = 0 → intersecting lines (a₁/a₂ = 1/3, b₁/b₂ = -2/4 = -1/2).\n\nKeywords: linear equations, graphical method, intersecting, parallel, coincident, consistent, inconsistent, unique solution"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c8_20261026_120000",
                            display_name: {
                                english: "Substitution & Elimination Methods",
                                hindi: "Substitution और Elimination Methods"
                            },
                            description: {
                                english: "1. Substitution Method:\nStep 1: Find value of one variable in terms of the other from either equation.\nStep 2: Substitute in the other equation to reduce to one variable.\nStep 3: Substitute back to find the other variable.\n\n2. Example: 7x - 15y = 2 and x + 2y = 3.\nFrom (2): x = 3 - 2y. Substitute in (1): 7(3 - 2y) - 15y = 2 → -29y = -19 → y = 19/29. Then x = 49/29.\n\n3. Elimination Method:\nStep 1: Multiply equations by suitable constants to make coefficients of one variable equal.\nStep 2: Add or subtract to eliminate that variable.\nStep 3: Solve for the remaining variable.\nStep 4: Substitute back to find the other variable.\n\n4. Example: 9x - 4y = 2000 and 7x - 3y = 2000.\nMultiply (1) by 3 and (2) by 4: 27x - 12y = 6000 and 28x - 12y = 8000.\nSubtract: x = 2000. Then y = 4000.\n\nKeywords: substitution method, elimination method, linear equations, solve, variables, coefficients"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c9_20261026_120000",
                            display_name: {
                                english: "Solved Examples - Linear Equations",
                                hindi: "हल किए गए उदाहरण - रैखिक समीकरण"
                            },
                            description: {
                                english: "Example 1: Aftab tells his daughter, 'Seven years ago, I was seven times as old as you were then. Also, three years from now, I shall be three times as old as you will be.' Find ages.\nSolution: s - 7 = 7(t - 7) → s - 7t + 42 = 0; s + 3 = 3(t + 3) → s - 3t = 6.\nSolving: s = 42, t = 12. Aftab is 42 years, daughter is 12 years.\n\nExample 2: Cost of 2 pencils and 3 erasers is ₹9; 4 pencils and 6 erasers is ₹18.\nSolution: 2x + 3y = 9 and 4x + 6y = 18. Equations are equivalent → infinitely many solutions.\n\nExample 3: Two rails: x + 2y - 4 = 0 and 2x + 4y - 12 = 0. Will they cross?\nSolution: a₁/a₂ = 1/2, b₁/b₂ = 2/4 = 1/2, c₁/c₂ = -4/-12 = 1/3. a₁/a₂ = b₁/b₂ ≠ c₁/c₂ → parallel lines. They will not cross.\n\nExample 4: Sum of two-digit number and reversed number is 66. Digits differ by 2.\nSolution: (10x + y) + (10y + x) = 66 → x + y = 6. Either x - y = 2 or y - x = 2.\nNumbers are 42 and 24.\n\nKeywords: ages, cost, rails, two-digit number, linear equations, infinitely many solutions, no solution"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 4: QUADRATIC EQUATIONS =====
        {
            id: "math_ch4_20261026_120000",
            display_name: {
                english: "📐 Quadratic Equations - Roots & Discriminant",
                hindi: "📐 द्विघात समीकरण - Roots और Discriminant"
            },
            color: "#A8E6CF",
            topics: [
                {
                    id: "math_t4_20261026_120000",
                    display_name: {
                        english: "📘 Standard Form, Factorisation & Quadratic Formula",
                        hindi: "📘 Standard Form, Factorisation और Quadratic Formula"
                    },
                    concepts: [
                        {
                            id: "math_c10_20261026_120000",
                            display_name: {
                                english: "Quadratic Equations - Basics & Factorisation",
                                hindi: "द्विघात समीकरण - मूल बातें और Factorisation"
                            },
                            description: {
                                english: "1. A quadratic equation in variable x is of the form ax² + bx + c = 0, where a, b, c are real numbers, a ≠ 0. This is the standard form.\n\n2. A real number α is a root of ax² + bx + c = 0 if aα² + bα + c = 0.\n\n3. The zeroes of the quadratic polynomial ax² + bx + c and the roots of the quadratic equation ax² + bx + c = 0 are the same.\n\n4. A quadratic equation can have at most two roots.\n\n5. Factorisation method: Split the middle term bx into two terms whose product is acx². Then factorise.\n\n6. Example: 2x² - 5x + 3 = 0 → 2x² - 2x - 3x + 3 = 0 → (2x - 3)(x - 1) = 0 → x = 3/2 or x = 1.\n\n7. Example: 6x² - x - 2 = 0 → (3x - 2)(2x + 1) = 0 → x = 2/3 or x = -1/2.\n\n8. Example: 3x² - 2√6x + 2 = 0 → (√3x - √2)² = 0 → x = √(2/3), repeated root.\n\n9. Quadratic formula: x = [-b ± √(b² - 4ac)] / 2a, provided b² - 4ac ≥ 0.\n\nKeywords: quadratic equation, standard form, roots, factorisation, quadratic formula, split middle term"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c11_20261026_120000",
                            display_name: {
                                english: "Nature of Roots & Discriminant",
                                hindi: "Roots की प्रकृति और Discriminant"
                            },
                            description: {
                                english: "1. Discriminant D = b² - 4ac.\n\n2. If D > 0: two distinct real roots. Roots are [-b + √D]/2a and [-b - √D]/2a.\n\n3. If D = 0: two equal real roots. Roots are -b/2a and -b/2a.\n\n4. If D < 0: no real roots.\n\n5. Example: 2x² - 4x + 3 = 0. D = (-4)² - 4×2×3 = 16 - 24 = -8 < 0 → no real roots.\n\n6. Example: 3x² - 2x + 1/3 = 0. D = (-2)² - 4×3×1/3 = 4 - 4 = 0 → two equal real roots, x = 1/3, 1/3.\n\n7. Example: Pole at boundary of circular park of diameter 13 m, difference of distances from gates A and B is 7 m.\nEquation: x² + 7x - 60 = 0. D = 49 + 240 = 289 > 0 → real roots. x = 5 or -12. x = 5 m from gate B, 12 m from gate A.\n\nKeywords: discriminant, nature of roots, real roots, equal roots, distinct roots, quadratic equation"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c12_20261026_120000",
                            display_name: {
                                english: "Solved Examples - Quadratic Equations",
                                hindi: "हल किए गए उदाहरण - द्विघात समीकरण"
                            },
                            description: {
                                english: "Example 1: Represent: John and Jivanti together have 45 marbles. Both lost 5 marbles each, product of remaining is 124.\nSolution: (x - 5)(40 - x) = 124 → -x² + 45x - 200 = 124 → x² - 45x + 324 = 0.\n\nExample 2: Cottage industry: cost per toy = 55 - number of toys. Total cost = ₹750.\nSolution: x(55 - x) = 750 → x² - 55x + 750 = 0.\n\nExample 3: Check if (x - 2)² + 1 = 2x - 3 is quadratic.\nSolution: x² - 4x + 5 = 2x - 3 → x² - 6x + 8 = 0. Yes, quadratic.\n\nExample 4: Check if x(x + 1) + 8 = (x + 2)(x - 2) is quadratic.\nSolution: x² + x + 8 = x² - 4 → x + 12 = 0. Not quadratic.\n\nExample 5: Find dimensions of prayer hall: area 300 m², length one metre more than twice breadth.\nSolution: x(2x + 1) = 300 → 2x² + x - 300 = 0 → (x - 12)(2x + 25) = 0 → x = 12. Breadth = 12 m, length = 25 m.\n\nKeywords: quadratic equation, marbles, toys, prayer hall, dimensions, check quadratic, examples"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 5: ARITHMETIC PROGRESSIONS =====
        {
            id: "math_ch5_20261026_120000",
            display_name: {
                english: "🔢 Arithmetic Progressions - nth Term & Sum",
                hindi: "🔢 Arithmetic Progressions - nth Term और Sum"
            },
            color: "#FFB347",
            topics: [
                {
                    id: "math_t5_20261026_120000",
                    display_name: {
                        english: "📈 AP Concepts, Formulas & Examples",
                        hindi: "📈 AP Concepts, Formulas और Examples"
                    },
                    concepts: [
                        {
                            id: "math_c13_20261026_120000",
                            display_name: {
                                english: "Arithmetic Progression - Basics & nth Term",
                                hindi: "Arithmetic Progression - मूल बातें और nth Term"
                            },
                            description: {
                                english: "1. An arithmetic progression (AP) is a list of numbers in which each term is obtained by adding a fixed number to the preceding term, except the first term.\n\n2. The fixed number is called the common difference d. It can be positive, negative or zero.\n\n3. General form of an AP: a, a + d, a + 2d, a + 3d, ... where a is the first term and d is the common difference.\n\n4. Condition for AP: a₂ - a₁ = a₃ - a₂ = ... = aₙ - aₙ₋₁ = d.\n\n5. nth term of an AP: aₙ = a + (n - 1)d.\n\n6. Example: 10th term of AP 2, 7, 12, ...: a = 2, d = 5, a₁₀ = 2 + 9×5 = 47.\n\n7. Example: Which term of AP 21, 18, 15, ... is -81?\n-81 = 21 + (n - 1)(-3) → n = 35. The 35th term is -81.\n\n8. Example: Determine AP whose 3rd term is 5 and 7th term is 9.\na + 2d = 5 and a + 6d = 9 → a = 3, d = 1. AP: 3, 4, 5, 6, 7, ...\n\n9. Sum of first n terms: Sₙ = (n/2)[2a + (n - 1)d].\n\n10. If l is the last term: Sₙ = (n/2)(a + l).\n\n11. nth term from sum: aₙ = Sₙ - Sₙ₋₁.\n\n12. Sum of first n positive integers: Sₙ = n(n + 1)/2.\n\nKeywords: arithmetic progression, AP, common difference, nth term, sum, general form, first term"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c14_20261026_120000",
                            display_name: {
                                english: "Solved Examples - AP",
                                hindi: "हल किए गए उदाहरण - AP"
                            },
                            description: {
                                english: "Example 1: Find sum of first 22 terms of AP: 8, 3, -2, ...\nSolution: a = 8, d = -5, n = 22. S₂₂ = (22/2)[16 + 21(-5)] = 11(16 - 105) = -979.\n\nExample 2: Sum of first 14 terms of an AP is 1050, first term is 10. Find 20th term.\nSolution: 1050 = (14/2)[20 + 13d] → 1050 = 7(20 + 13d) → d = 10. a₂₀ = 10 + 19×10 = 200.\n\nExample 3: How many terms of AP 24, 21, 18, ... must be taken so that sum is 78?\nSolution: a = 24, d = -3, Sₙ = 78. 78 = (n/2)[48 + (n-1)(-3)] → 3n² - 51n + 156 = 0 → n = 4 or 13.\n\nExample 4: Find sum of first 1000 positive integers.\nSolution: S₁₀₀₀ = (1000/2)(1 + 1000) = 500×1001 = 500500.\n\nExample 5: TV manufacturer produced 600 sets in 3rd year and 700 sets in 7th year. Find production in 1st year, 10th year, and total in first 7 years.\nSolution: a + 2d = 600 and a + 6d = 700 → d = 25, a = 550.\na₁₀ = 550 + 9×25 = 775.\nS₇ = (7/2)[1100 + 6×25] = (7/2)(1250) = 4375.\n\nKeywords: sum of AP, nth term, examples, positive integers, TV production, first term, common difference"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 6: TRIANGLES =====
        {
            id: "math_ch6_20261026_120000",
            display_name: {
                english: "🔺 Triangles - Similarity & Theorems",
                hindi: "🔺 त्रिभुज - Similarity और Theorems"
            },
            color: "#DDA0DD",
            topics: [
                {
                    id: "math_t6_20261026_120000",
                    display_name: {
                        english: "📐 Similar Figures, BPT & Similarity Criteria",
                        hindi: "📐 Similar Figures, BPT और Similarity Criteria"
                    },
                    concepts: [
                        {
                            id: "math_c15_20261026_120000",
                            display_name: {
                                english: "Similar Figures & Basic Proportionality Theorem",
                                hindi: "Similar Figures और Basic Proportionality Theorem"
                            },
                            description: {
                                english: "1. Two figures having the same shape (and not necessarily the same size) are called similar figures.\n\n2. All congruent figures are similar but the similar figures need not be congruent.\n\n3. All circles are similar. All squares are similar. All equilateral triangles are similar.\n\n4. Two polygons of the same number of sides are similar, if (i) their corresponding angles are equal and (ii) their corresponding sides are in the same ratio (or proportion).\n\n5. The same ratio of corresponding sides is called the scale factor.\n\n6. Theorem 6.1 (Basic Proportionality Theorem / Thales Theorem): If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio.\nIf DE || BC in ΔABC, then AD/DB = AE/EC.\n\n7. Theorem 6.2 (Converse of BPT): If a line divides any two sides of a triangle in the same ratio, then the line is parallel to the third side.\n\nKeywords: similar figures, congruent, polygons, corresponding angles, corresponding sides, BPT, Thales theorem, parallel line"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c16_20261026_120000",
                            display_name: {
                                english: "Criteria for Similarity of Triangles",
                                hindi: "Triangles की Similarity के Criteria"
                            },
                            description: {
                                english: "1. Two triangles are similar, if (i) their corresponding angles are equal and (ii) their corresponding sides are in the same ratio (or proportion).\n\n2. AAA Similarity Criterion (Theorem 6.3): If in two triangles, corresponding angles are equal, then their corresponding sides are in the same ratio and hence the two triangles are similar.\n\n3. AA Similarity Criterion: If two angles of one triangle are respectively equal to two angles of another triangle, then the two triangles are similar.\n\n4. SSS Similarity Criterion (Theorem 6.4): If in two triangles, sides of one triangle are proportional to the sides of the other triangle, then their corresponding angles are equal and hence the two triangles are similar.\n\n5. SAS Similarity Criterion (Theorem 6.5): If one angle of a triangle is equal to one angle of the other triangle and the sides including these angles are proportional, then the two triangles are similar.\n\n6. RHS Similarity Criterion: If in two right triangles, hypotenuse and one side of one triangle are proportional to the hypotenuse and one side of the other triangle, then the two triangles are similar.\n\n7. Similarity is expressed as ΔABC ~ ΔDEF with correct correspondence of vertices.\n\nKeywords: AAA similarity, AA similarity, SSS similarity, SAS similarity, RHS similarity, corresponding angles, proportional sides, triangles"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c17_20261026_120000",
                            display_name: {
                                english: "Solved Examples - Triangles",
                                hindi: "हल किए गए उदाहरण - त्रिभुज"
                            },
                            description: {
                                english: "Example 1: If DE || BC in ΔABC, prove AD/AB = AE/AC.\nSolution: DE || BC → AD/DB = AE/EC (BPT). Adding 1 to both sides: AD/DB + 1 = AE/EC + 1 → (AD + DB)/DB = (AE + EC)/EC → AB/DB = AC/EC. Also AD/AB = AE/AC.\n\nExample 2: ABCD is a trapezium with AB || DC. E and F are on AD and BC such that EF || AB. Show AE/ED = BF/FC.\nSolution: Join AC intersecting EF at G. In ΔADC, EG || DC → AE/ED = AG/GC. In ΔCAB, GF || AB → CG/AG = CF/BF → AG/GC = BF/FC. Therefore AE/ED = BF/FC.\n\nExample 3: In Fig, PS/SQ = PT/TR and ∠PST = ∠PRQ. Prove PQR is isosceles.\nSolution: PS/SQ = PT/TR → ST || QR (Theorem 6.2). ∠PST = ∠PQR (corresponding angles). Given ∠PST = ∠PRQ. So ∠PRQ = ∠PQR → PQ = PR. PQR is isosceles.\n\nExample 4: Girl of height 90 cm walks away from lamp-post at 1.2 m/s. Lamp is 3.6 m above ground. Find shadow length after 4 seconds.\nSolution: BD = 1.2 × 4 = 4.8 m. ΔABE ~ ΔCDE (AA similarity). AB/CD = BE/DE → 3.6/0.9 = (4.8 + x)/x → 4 = (4.8 + x)/x → 4x = 4.8 + x → 3x = 4.8 → x = 1.6 m.\n\nKeywords: BPT, trapezium, isosceles triangle, shadow, similar triangles, AA similarity, examples"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 7: COORDINATE GEOMETRY =====
        {
            id: "math_ch7_20261026_120000",
            display_name: {
                english: "📌 Coordinate Geometry - Distance & Section Formula",
                hindi: "📌 Coordinate Geometry - Distance और Section Formula"
            },
            color: "#FF6B6B",
            topics: [
                {
                    id: "math_t7_20261026_120000",
                    display_name: {
                        english: "📏 Distance Formula, Section Formula & Midpoint",
                        hindi: "📏 Distance Formula, Section Formula और Midpoint"
                    },
                    concepts: [
                        {
                            id: "math_c18_20261026_120000",
                            display_name: {
                                english: "Distance Formula & Solved Examples",
                                hindi: "Distance Formula और हल किए गए उदाहरण"
                            },
                            description: {
                                english: "1. Distance between points P(x₁, y₁) and Q(x₂, y₂): PQ = √[(x₂ - x₁)² + (y₂ - y₁)²].\n\n2. Distance of point P(x, y) from origin O(0, 0): OP = √(x² + y²).\n\n3. Example: Points (3, 2), (-2, -3), (2, 3).\nPQ = √50 = 7.07; QR = √52 = 7.21; PR = √2 = 1.41. PQ² + PR² = 50 + 2 = 52 = QR² → right triangle at P.\n\n4. Example: Points (1, 7), (4, 2), (-1, -1), (-4, 4) form a square.\nAB = BC = CD = DA = √34; AC = BD = √68. All sides equal, diagonals equal → square.\n\n5. Example: Points A(3, 1), B(6, 4), C(8, 6). AB = 3√2, BC = 2√2, AC = 5√2. AB + BC = AC → collinear.\n\n6. Example: Find relation between x and y such that (x, y) is equidistant from (7, 1) and (3, 5).\n(x - 7)² + (y - 1)² = (x - 3)² + (y - 5)² → x - y = 2.\n\n7. Example: Point on y-axis equidistant from A(6, 5) and B(-4, 3).\n(0, y): 36 + (5 - y)² = 16 + (3 - y)² → 4y = 36 → y = 9. Point is (0, 9).\n\nKeywords: distance formula, origin, right triangle, square, collinear, equidistant, y-axis, examples"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c19_20261026_120000",
                            display_name: {
                                english: "Section Formula & Midpoint Formula",
                                hindi: "Section Formula और Midpoint Formula"
                            },
                            description: {
                                english: "1. Section Formula: Coordinates of point P(x, y) dividing line segment joining A(x₁, y₁) and B(x₂, y₂) internally in ratio m₁ : m₂ are:\nx = (m₁x₂ + m₂x₁)/(m₁ + m₂), y = (m₁y₂ + m₂y₁)/(m₁ + m₂).\n\n2. If ratio is k : 1: x = (kx₂ + x₁)/(k + 1), y = (ky₂ + y₁)/(k + 1).\n\n3. Midpoint Formula: Midpoint of A(x₁, y₁) and B(x₂, y₂) is ((x₁ + x₂)/2, (y₁ + y₂)/2).\n\n4. Example: Point dividing (4, -3) and (8, 5) in ratio 3 : 1 internally.\nx = (3×8 + 1×4)/4 = 7; y = (3×5 + 1×(-3))/4 = 3. Point is (7, 3).\n\n5. Example: In what ratio does (-4, 6) divide line joining A(-6, 10) and B(3, -8)?\n-4 = (3m₁ - 6m₂)/(m₁ + m₂) → m₁ : m₂ = 2 : 7.\n\n6. Example: Trisection points of line segment joining A(2, -2) and B(-7, 4).\nP divides in 1 : 2 → (-1, 0); Q divides in 2 : 1 → (-4, 2).\n\n7. Example: Ratio in which y-axis divides line joining (5, -6) and (-1, -4).\nLet ratio be k : 1. x-coordinate = 0 → (-k + 5)/(k + 1) = 0 → k = 5. Ratio is 5 : 1. Point is (0, -13/3).\n\n8. Example: Parallelogram A(6, 1), B(8, 2), C(9, 4), D(p, 3). Diagonals bisect each other.\nMidpoint of AC = Midpoint of BD → (15/2, 5/2) = ((8 + p)/2, 5/2) → p = 7.\n\nKeywords: section formula, midpoint formula, ratio, trisection, y-axis, parallelogram, diagonals, examples"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        },
		{
            id: "math_ch1_20261026_120000",
            display_name: {
                english: "🔢 Real Numbers - Euclid's Algorithm & Fundamental Theorem",
                hindi: "🔢 Real Numbers - Euclid's Algorithm और Fundamental Theorem"
            },
            color: "#FF6B6B",
            topics: [
                {
                    id: "math_t1_20261026_120000",
                    display_name: {
                        english: "📘 Fundamental Theorem of Arithmetic & Irrational Numbers",
                        hindi: "📘 Fundamental Theorem of Arithmetic और Irrational Numbers"
                    },
                    concepts: [
                        {
                            id: "math_c1_20261026_120000",
                            display_name: {
                                english: "Fundamental Theorem of Arithmetic",
                                hindi: "Fundamental Theorem of Arithmetic"
                            },
                            description: {
                                english: "1. Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur.\n\n2. Example: 32760 = 2³ × 3² × 5 × 7 × 13.\n\n3. Example: 123456789 = 3² × 3803 × 3607.\n\n4. HCF(a, b) = Product of the smallest power of each common prime factor in the numbers.\n\n5. LCM(a, b) = Product of the greatest power of each prime factor, involved in the numbers.\n\n6. For any two positive integers a and b: HCF(a, b) × LCM(a, b) = a × b.\n\n7. For three numbers p, q, r: LCM(p,q,r) = p·q·r·HCF(p,q,r) / [HCF(p,q)·HCF(q,r)·HCF(p,r)].\n\n8. For three numbers p, q, r: HCF(p,q,r) = p·q·r·LCM(p,q,r) / [LCM(p,q)·LCM(q,r)·LCM(p,r)].\n\n9. Remark: HCF(p,q,r) × LCM(p,q,r) ≠ p × q × r for three numbers.\n\nKeywords: fundamental theorem, prime factorisation, HCF, LCM, composite number, unique factorisation, Euclid"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c2_20261026_120000",
                            display_name: {
                                english: "Irrational Numbers - Proofs & Theorems",
                                hindi: "Irrational Numbers - Proofs और Theorems"
                            },
                            description: {
                                english: "1. A number 's' is called irrational if it cannot be written in the form p/q where p and q are integers and q ≠ 0.\n\n2. Examples: √2, √3, √15, π, -√2/√3, 0.10110111011110...\n\n3. Theorem 1.2: Let p be a prime number. If p divides a², then p divides a, where a is a positive integer.\n\n4. Theorem 1.3: √2 is irrational (proved by contradiction).\n\n5. √3 is irrational (proved by contradiction).\n\n6. 5 - √3 is irrational.\n\n7. 3√2 is irrational.\n\n8. The sum or difference of a rational and an irrational number is irrational.\n\n9. The product and quotient of a non-zero rational and irrational number is irrational.\n\nKeywords: irrational numbers, proof by contradiction, prime divisor, square root, rational, real numbers"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c3_20261026_120000",
                            display_name: {
                                english: "Solved Examples - Real Numbers",
                                hindi: "हल किए गए उदाहरण - Real Numbers"
                            },
                            description: {
                                english: "Example 1: Consider 4ⁿ, where n is a natural number. Check whether there is any value of n for which 4ⁿ ends with the digit zero.\nSolution: 4ⁿ = (2)²ⁿ; the only prime in the factorisation is 2. Since 5 is not a factor, 4ⁿ cannot end with digit zero. No such n exists.\n\nExample 2: Find LCM and HCF of 6 and 20 by prime factorisation.\nSolution: 6 = 2¹ × 3¹; 20 = 2² × 5¹.\nHCF(6, 20) = 2¹ = 2.\nLCM(6, 20) = 2² × 3¹ × 5¹ = 60.\nVerify: HCF × LCM = 2 × 60 = 120 = 6 × 20.\n\nExample 3: Find HCF of 96 and 404 by prime factorisation. Hence find LCM.\nSolution: 96 = 2⁵ × 3; 404 = 2² × 101.\nHCF = 2² = 4.\nLCM = (96 × 404) / 4 = 9696.\n\nExample 4: Find HCF and LCM of 6, 72 and 120.\nSolution: 6 = 2 × 3; 72 = 2³ × 3²; 120 = 2³ × 3 × 5.\nHCF = 2¹ × 3¹ = 6.\nLCM = 2³ × 3² × 5¹ = 360.\nNote: 6 × 72 × 120 ≠ HCF × LCM.\n\nKeywords: HCF, LCM, prime factorisation, examples, 4ⁿ, digit zero, verify"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 2: POLYNOMIALS =====
        {
            id: "math_ch2_20261026_120000",
            display_name: {
                english: "📈 Polynomials - Zeroes & Coefficients",
                hindi: "📈 बहुपद - Zeroes और Coefficients"
            },
            color: "#4ECDC4",
            topics: [
                {
                    id: "math_t2_20261026_120000",
                    display_name: {
                        english: "📐 Types of Polynomials & Geometrical Meaning",
                        hindi: "📐 बहुपद के प्रकार और Geometrical Meaning"
                    },
                    concepts: [
                        {
                            id: "math_c4_20261026_120000",
                            display_name: {
                                english: "Polynomial Basics & Degrees",
                                hindi: "बहुपद मूल बातें और Degrees"
                            },
                            description: {
                                english: "1. If p(x) is a polynomial in x, the highest power of x in p(x) is called the degree of the polynomial p(x).\n\n2. Linear polynomial: degree 1, form ax + b, a ≠ 0. Examples: 2x - 3, √3x + 5, y + √2.\n\n3. Quadratic polynomial: degree 2, form ax² + bx + c, a ≠ 0. Examples: 2x² + 3x - 2/5, y² - 2, 2 - x² + √3x.\n\n4. Cubic polynomial: degree 3, form ax³ + bx² + cx + d, a ≠ 0.\n\n5. A real number k is said to be a zero of a polynomial p(x), if p(k) = 0.\n\n6. The zero of the linear polynomial ax + b is -b/a = -(Constant term)/(Coefficient of x).\n\n7. A polynomial of degree n has at most n zeroes.\n\n8. Geometrically, the zeroes of a polynomial p(x) are precisely the x-coordinates of the points where the graph of y = p(x) intersects the x-axis.\n\nKeywords: polynomial, degree, linear, quadratic, cubic, zeroes, graph, x-axis"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c5_20261026_120000",
                            display_name: {
                                english: "Relationship Between Zeroes & Coefficients",
                                hindi: "Zeroes और Coefficients के बीच संबंध"
                            },
                            description: {
                                english: "1. For quadratic polynomial p(x) = ax² + bx + c, a ≠ 0, with zeroes α and β:\nSum of zeroes = α + β = -b/a = -(Coefficient of x)/(Coefficient of x²).\nProduct of zeroes = αβ = c/a = (Constant term)/(Coefficient of x²).\n\n2. For cubic polynomial p(x) = ax³ + bx² + cx + d, with zeroes α, β, γ:\nα + β + γ = -b/a\nαβ + βγ + γα = c/a\nαβγ = -d/a\n\n3. Example: For 2x² - 8x + 6, zeroes are 1 and 3. Sum = 4 = -(-8)/2; Product = 3 = 6/2.\n\n4. Example: For 3x² + 5x - 2, zeroes are 1/3 and -2. Sum = -5/3; Product = -2/3.\n\n5. A quadratic polynomial with given sum S and product P of zeroes is k(x² - Sx + P), where k is real.\n\n6. Example: Sum = -3, Product = 2 → polynomial x² + 3x + 2.\n\nKeywords: zeroes, coefficients, sum, product, quadratic, cubic, alpha, beta, gamma"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c6_20261026_120000",
                            display_name: {
                                english: "Solved Examples - Polynomials",
                                hindi: "हल किए गए उदाहरण - बहुपद"
                            },
                            description: {
                                english: "Example 1: Find zeroes of x² + 7x + 10 and verify relationship.\nSolution: x² + 7x + 10 = (x + 2)(x + 5). Zeroes are -2 and -5.\nSum = -7 = -(-7)/1; Product = 10 = 10/1.\n\nExample 2: Find zeroes of x² - 3 and verify.\nSolution: x² - 3 = (x - √3)(x + √3). Zeroes are √3 and -√3.\nSum = 0 = -0/1; Product = -3 = -3/1.\n\nExample 3: Find a quadratic polynomial with sum -3 and product 2.\nSolution: Polynomial is x² + 3x + 2.\n\nExample 4: Verify that 3, -1, -1/3 are zeroes of p(x) = 3x³ - 5x² - 11x - 3.\nSolution: p(3) = 0, p(-1) = 0, p(-1/3) = 0. Verified.\nSum = 5/3 = -(-5)/3; αβ + βγ + γα = -11/3; αβγ = 1 = -(-3)/3.\n\nKeywords: zeroes, verify, quadratic, cubic, sum, product, examples, polynomial"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 3: PAIR OF LINEAR EQUATIONS =====
        {
            id: "math_ch3_20261026_120000",
            display_name: {
                english: "📊 Pair of Linear Equations in Two Variables",
                hindi: "📊 दो चरों में रैखिक समीकरणों का युग्म"
            },
            color: "#FFE66D",
            topics: [
                {
                    id: "math_t3_20261026_120000",
                    display_name: {
                        english: "📉 Graphical & Algebraic Methods",
                        hindi: "📉 Graphical और Algebraic Methods"
                    },
                    concepts: [
                        {
                            id: "math_c7_20261026_120000",
                            display_name: {
                                english: "Graphical Method & Consistency",
                                hindi: "Graphical Method और Consistency"
                            },
                            description: {
                                english: "1. General form: a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0.\n\n2. Intersecting lines: a₁/a₂ ≠ b₁/b₂. Unique solution. Consistent pair.\n\n3. Coincident lines: a₁/a₂ = b₁/b₂ = c₁/c₂. Infinitely many solutions. Dependent (consistent) pair.\n\n4. Parallel lines: a₁/a₂ = b₁/b₂ ≠ c₁/c₂. No solution. Inconsistent pair.\n\n5. A pair of linear equations which has no solution is called an inconsistent pair.\n\n6. A pair of linear equations which has a solution is called a consistent pair.\n\n7. A dependent pair of linear equations is always consistent.\n\n8. Example: x - 2y = 0 and 3x + 4y - 20 = 0 → intersecting lines (a₁/a₂ = 1/3, b₁/b₂ = -2/4 = -1/2).\n\nKeywords: linear equations, graphical method, intersecting, parallel, coincident, consistent, inconsistent, unique solution"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c8_20261026_120000",
                            display_name: {
                                english: "Substitution & Elimination Methods",
                                hindi: "Substitution और Elimination Methods"
                            },
                            description: {
                                english: "1. Substitution Method:\nStep 1: Find value of one variable in terms of the other from either equation.\nStep 2: Substitute in the other equation to reduce to one variable.\nStep 3: Substitute back to find the other variable.\n\n2. Example: 7x - 15y = 2 and x + 2y = 3.\nFrom (2): x = 3 - 2y. Substitute in (1): 7(3 - 2y) - 15y = 2 → -29y = -19 → y = 19/29. Then x = 49/29.\n\n3. Elimination Method:\nStep 1: Multiply equations by suitable constants to make coefficients of one variable equal.\nStep 2: Add or subtract to eliminate that variable.\nStep 3: Solve for the remaining variable.\nStep 4: Substitute back to find the other variable.\n\n4. Example: 9x - 4y = 2000 and 7x - 3y = 2000.\nMultiply (1) by 3 and (2) by 4: 27x - 12y = 6000 and 28x - 12y = 8000.\nSubtract: x = 2000. Then y = 4000.\n\nKeywords: substitution method, elimination method, linear equations, solve, variables, coefficients"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c9_20261026_120000",
                            display_name: {
                                english: "Solved Examples - Linear Equations",
                                hindi: "हल किए गए उदाहरण - रैखिक समीकरण"
                            },
                            description: {
                                english: "Example 1: Aftab tells his daughter, 'Seven years ago, I was seven times as old as you were then. Also, three years from now, I shall be three times as old as you will be.' Find ages.\nSolution: s - 7 = 7(t - 7) → s - 7t + 42 = 0; s + 3 = 3(t + 3) → s - 3t = 6.\nSolving: s = 42, t = 12. Aftab is 42 years, daughter is 12 years.\n\nExample 2: Cost of 2 pencils and 3 erasers is ₹9; 4 pencils and 6 erasers is ₹18.\nSolution: 2x + 3y = 9 and 4x + 6y = 18. Equations are equivalent → infinitely many solutions.\n\nExample 3: Two rails: x + 2y - 4 = 0 and 2x + 4y - 12 = 0. Will they cross?\nSolution: a₁/a₂ = 1/2, b₁/b₂ = 2/4 = 1/2, c₁/c₂ = -4/-12 = 1/3. a₁/a₂ = b₁/b₂ ≠ c₁/c₂ → parallel lines. They will not cross.\n\nExample 4: Sum of two-digit number and reversed number is 66. Digits differ by 2.\nSolution: (10x + y) + (10y + x) = 66 → x + y = 6. Either x - y = 2 or y - x = 2.\nNumbers are 42 and 24.\n\nKeywords: ages, cost, rails, two-digit number, linear equations, infinitely many solutions, no solution"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 4: QUADRATIC EQUATIONS =====
        {
            id: "math_ch4_20261026_120000",
            display_name: {
                english: "📐 Quadratic Equations - Roots & Discriminant",
                hindi: "📐 द्विघात समीकरण - Roots और Discriminant"
            },
            color: "#A8E6CF",
            topics: [
                {
                    id: "math_t4_20261026_120000",
                    display_name: {
                        english: "📘 Standard Form, Factorisation & Quadratic Formula",
                        hindi: "📘 Standard Form, Factorisation और Quadratic Formula"
                    },
                    concepts: [
                        {
                            id: "math_c10_20261026_120000",
                            display_name: {
                                english: "Quadratic Equations - Basics & Factorisation",
                                hindi: "द्विघात समीकरण - मूल बातें और Factorisation"
                            },
                            description: {
                                english: "1. A quadratic equation in variable x is of the form ax² + bx + c = 0, where a, b, c are real numbers, a ≠ 0. This is the standard form.\n\n2. A real number α is a root of ax² + bx + c = 0 if aα² + bα + c = 0.\n\n3. The zeroes of the quadratic polynomial ax² + bx + c and the roots of the quadratic equation ax² + bx + c = 0 are the same.\n\n4. A quadratic equation can have at most two roots.\n\n5. Factorisation method: Split the middle term bx into two terms whose product is acx². Then factorise.\n\n6. Example: 2x² - 5x + 3 = 0 → 2x² - 2x - 3x + 3 = 0 → (2x - 3)(x - 1) = 0 → x = 3/2 or x = 1.\n\n7. Example: 6x² - x - 2 = 0 → (3x - 2)(2x + 1) = 0 → x = 2/3 or x = -1/2.\n\n8. Example: 3x² - 2√6x + 2 = 0 → (√3x - √2)² = 0 → x = √(2/3), repeated root.\n\n9. Quadratic formula: x = [-b ± √(b² - 4ac)] / 2a, provided b² - 4ac ≥ 0.\n\nKeywords: quadratic equation, standard form, roots, factorisation, quadratic formula, split middle term"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c11_20261026_120000",
                            display_name: {
                                english: "Nature of Roots & Discriminant",
                                hindi: "Roots की प्रकृति और Discriminant"
                            },
                            description: {
                                english: "1. Discriminant D = b² - 4ac.\n\n2. If D > 0: two distinct real roots. Roots are [-b + √D]/2a and [-b - √D]/2a.\n\n3. If D = 0: two equal real roots. Roots are -b/2a and -b/2a.\n\n4. If D < 0: no real roots.\n\n5. Example: 2x² - 4x + 3 = 0. D = (-4)² - 4×2×3 = 16 - 24 = -8 < 0 → no real roots.\n\n6. Example: 3x² - 2x + 1/3 = 0. D = (-2)² - 4×3×1/3 = 4 - 4 = 0 → two equal real roots, x = 1/3, 1/3.\n\n7. Example: Pole at boundary of circular park of diameter 13 m, difference of distances from gates A and B is 7 m.\nEquation: x² + 7x - 60 = 0. D = 49 + 240 = 289 > 0 → real roots. x = 5 or -12. x = 5 m from gate B, 12 m from gate A.\n\nKeywords: discriminant, nature of roots, real roots, equal roots, distinct roots, quadratic equation"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c12_20261026_120000",
                            display_name: {
                                english: "Solved Examples - Quadratic Equations",
                                hindi: "हल किए गए उदाहरण - द्विघात समीकरण"
                            },
                            description: {
                                english: "Example 1: Represent: John and Jivanti together have 45 marbles. Both lost 5 marbles each, product of remaining is 124.\nSolution: (x - 5)(40 - x) = 124 → -x² + 45x - 200 = 124 → x² - 45x + 324 = 0.\n\nExample 2: Cottage industry: cost per toy = 55 - number of toys. Total cost = ₹750.\nSolution: x(55 - x) = 750 → x² - 55x + 750 = 0.\n\nExample 3: Check if (x - 2)² + 1 = 2x - 3 is quadratic.\nSolution: x² - 4x + 5 = 2x - 3 → x² - 6x + 8 = 0. Yes, quadratic.\n\nExample 4: Check if x(x + 1) + 8 = (x + 2)(x - 2) is quadratic.\nSolution: x² + x + 8 = x² - 4 → x + 12 = 0. Not quadratic.\n\nExample 5: Find dimensions of prayer hall: area 300 m², length one metre more than twice breadth.\nSolution: x(2x + 1) = 300 → 2x² + x - 300 = 0 → (x - 12)(2x + 25) = 0 → x = 12. Breadth = 12 m, length = 25 m.\n\nKeywords: quadratic equation, marbles, toys, prayer hall, dimensions, check quadratic, examples"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 5: ARITHMETIC PROGRESSIONS =====
        {
            id: "math_ch5_20261026_120000",
            display_name: {
                english: "🔢 Arithmetic Progressions - nth Term & Sum",
                hindi: "🔢 Arithmetic Progressions - nth Term और Sum"
            },
            color: "#FFB347",
            topics: [
                {
                    id: "math_t5_20261026_120000",
                    display_name: {
                        english: "📈 AP Concepts, Formulas & Examples",
                        hindi: "📈 AP Concepts, Formulas और Examples"
                    },
                    concepts: [
                        {
                            id: "math_c13_20261026_120000",
                            display_name: {
                                english: "Arithmetic Progression - Basics & nth Term",
                                hindi: "Arithmetic Progression - मूल बातें और nth Term"
                            },
                            description: {
                                english: "1. An arithmetic progression (AP) is a list of numbers in which each term is obtained by adding a fixed number to the preceding term, except the first term.\n\n2. The fixed number is called the common difference d. It can be positive, negative or zero.\n\n3. General form of an AP: a, a + d, a + 2d, a + 3d, ... where a is the first term and d is the common difference.\n\n4. Condition for AP: a₂ - a₁ = a₃ - a₂ = ... = aₙ - aₙ₋₁ = d.\n\n5. nth term of an AP: aₙ = a + (n - 1)d.\n\n6. Example: 10th term of AP 2, 7, 12, ...: a = 2, d = 5, a₁₀ = 2 + 9×5 = 47.\n\n7. Example: Which term of AP 21, 18, 15, ... is -81?\n-81 = 21 + (n - 1)(-3) → n = 35. The 35th term is -81.\n\n8. Example: Determine AP whose 3rd term is 5 and 7th term is 9.\na + 2d = 5 and a + 6d = 9 → a = 3, d = 1. AP: 3, 4, 5, 6, 7, ...\n\n9. Sum of first n terms: Sₙ = (n/2)[2a + (n - 1)d].\n\n10. If l is the last term: Sₙ = (n/2)(a + l).\n\n11. nth term from sum: aₙ = Sₙ - Sₙ₋₁.\n\n12. Sum of first n positive integers: Sₙ = n(n + 1)/2.\n\nKeywords: arithmetic progression, AP, common difference, nth term, sum, general form, first term"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c14_20261026_120000",
                            display_name: {
                                english: "Solved Examples - AP",
                                hindi: "हल किए गए उदाहरण - AP"
                            },
                            description: {
                                english: "Example 1: Find sum of first 22 terms of AP: 8, 3, -2, ...\nSolution: a = 8, d = -5, n = 22. S₂₂ = (22/2)[16 + 21(-5)] = 11(16 - 105) = -979.\n\nExample 2: Sum of first 14 terms of an AP is 1050, first term is 10. Find 20th term.\nSolution: 1050 = (14/2)[20 + 13d] → 1050 = 7(20 + 13d) → d = 10. a₂₀ = 10 + 19×10 = 200.\n\nExample 3: How many terms of AP 24, 21, 18, ... must be taken so that sum is 78?\nSolution: a = 24, d = -3, Sₙ = 78. 78 = (n/2)[48 + (n-1)(-3)] → 3n² - 51n + 156 = 0 → n = 4 or 13.\n\nExample 4: Find sum of first 1000 positive integers.\nSolution: S₁₀₀₀ = (1000/2)(1 + 1000) = 500×1001 = 500500.\n\nExample 5: TV manufacturer produced 600 sets in 3rd year and 700 sets in 7th year. Find production in 1st year, 10th year, and total in first 7 years.\nSolution: a + 2d = 600 and a + 6d = 700 → d = 25, a = 550.\na₁₀ = 550 + 9×25 = 775.\nS₇ = (7/2)[1100 + 6×25] = (7/2)(1250) = 4375.\n\nKeywords: sum of AP, nth term, examples, positive integers, TV production, first term, common difference"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 6: TRIANGLES =====
        {
            id: "math_ch6_20261026_120000",
            display_name: {
                english: "🔺 Triangles - Similarity & Theorems",
                hindi: "🔺 त्रिभुज - Similarity और Theorems"
            },
            color: "#DDA0DD",
            topics: [
                {
                    id: "math_t6_20261026_120000",
                    display_name: {
                        english: "📐 Similar Figures, BPT & Similarity Criteria",
                        hindi: "📐 Similar Figures, BPT और Similarity Criteria"
                    },
                    concepts: [
                        {
                            id: "math_c15_20261026_120000",
                            display_name: {
                                english: "Similar Figures & Basic Proportionality Theorem",
                                hindi: "Similar Figures और Basic Proportionality Theorem"
                            },
                            description: {
                                english: "1. Two figures having the same shape (and not necessarily the same size) are called similar figures.\n\n2. All congruent figures are similar but the similar figures need not be congruent.\n\n3. All circles are similar. All squares are similar. All equilateral triangles are similar.\n\n4. Two polygons of the same number of sides are similar, if (i) their corresponding angles are equal and (ii) their corresponding sides are in the same ratio (or proportion).\n\n5. The same ratio of corresponding sides is called the scale factor.\n\n6. Theorem 6.1 (Basic Proportionality Theorem / Thales Theorem): If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio.\nIf DE || BC in ΔABC, then AD/DB = AE/EC.\n\n7. Theorem 6.2 (Converse of BPT): If a line divides any two sides of a triangle in the same ratio, then the line is parallel to the third side.\n\nKeywords: similar figures, congruent, polygons, corresponding angles, corresponding sides, BPT, Thales theorem, parallel line"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c16_20261026_120000",
                            display_name: {
                                english: "Criteria for Similarity of Triangles",
                                hindi: "Triangles की Similarity के Criteria"
                            },
                            description: {
                                english: "1. Two triangles are similar, if (i) their corresponding angles are equal and (ii) their corresponding sides are in the same ratio (or proportion).\n\n2. AAA Similarity Criterion (Theorem 6.3): If in two triangles, corresponding angles are equal, then their corresponding sides are in the same ratio and hence the two triangles are similar.\n\n3. AA Similarity Criterion: If two angles of one triangle are respectively equal to two angles of another triangle, then the two triangles are similar.\n\n4. SSS Similarity Criterion (Theorem 6.4): If in two triangles, sides of one triangle are proportional to the sides of the other triangle, then their corresponding angles are equal and hence the two triangles are similar.\n\n5. SAS Similarity Criterion (Theorem 6.5): If one angle of a triangle is equal to one angle of the other triangle and the sides including these angles are proportional, then the two triangles are similar.\n\n6. RHS Similarity Criterion: If in two right triangles, hypotenuse and one side of one triangle are proportional to the hypotenuse and one side of the other triangle, then the two triangles are similar.\n\n7. Similarity is expressed as ΔABC ~ ΔDEF with correct correspondence of vertices.\n\nKeywords: AAA similarity, AA similarity, SSS similarity, SAS similarity, RHS similarity, corresponding angles, proportional sides, triangles"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c17_20261026_120000",
                            display_name: {
                                english: "Solved Examples - Triangles",
                                hindi: "हल किए गए उदाहरण - त्रिभुज"
                            },
                            description: {
                                english: "Example 1: If DE || BC in ΔABC, prove AD/AB = AE/AC.\nSolution: DE || BC → AD/DB = AE/EC (BPT). Adding 1 to both sides: AD/DB + 1 = AE/EC + 1 → (AD + DB)/DB = (AE + EC)/EC → AB/DB = AC/EC. Also AD/AB = AE/AC.\n\nExample 2: ABCD is a trapezium with AB || DC. E and F are on AD and BC such that EF || AB. Show AE/ED = BF/FC.\nSolution: Join AC intersecting EF at G. In ΔADC, EG || DC → AE/ED = AG/GC. In ΔCAB, GF || AB → CG/AG = CF/BF → AG/GC = BF/FC. Therefore AE/ED = BF/FC.\n\nExample 3: In Fig, PS/SQ = PT/TR and ∠PST = ∠PRQ. Prove PQR is isosceles.\nSolution: PS/SQ = PT/TR → ST || QR (Theorem 6.2). ∠PST = ∠PQR (corresponding angles). Given ∠PST = ∠PRQ. So ∠PRQ = ∠PQR → PQ = PR. PQR is isosceles.\n\nExample 4: Girl of height 90 cm walks away from lamp-post at 1.2 m/s. Lamp is 3.6 m above ground. Find shadow length after 4 seconds.\nSolution: BD = 1.2 × 4 = 4.8 m. ΔABE ~ ΔCDE (AA similarity). AB/CD = BE/DE → 3.6/0.9 = (4.8 + x)/x → 4 = (4.8 + x)/x → 4x = 4.8 + x → 3x = 4.8 → x = 1.6 m.\n\nKeywords: BPT, trapezium, isosceles triangle, shadow, similar triangles, AA similarity, examples"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        },
        // ===== CHAPTER 7: COORDINATE GEOMETRY =====
        {
            id: "math_ch7_20261026_120000",
            display_name: {
                english: "📌 Coordinate Geometry - Distance & Section Formula",
                hindi: "📌 Coordinate Geometry - Distance और Section Formula"
            },
            color: "#FF6B6B",
            topics: [
                {
                    id: "math_t7_20261026_120000",
                    display_name: {
                        english: "📏 Distance Formula, Section Formula & Midpoint",
                        hindi: "📏 Distance Formula, Section Formula और Midpoint"
                    },
                    concepts: [
                        {
                            id: "math_c18_20261026_120000",
                            display_name: {
                                english: "Distance Formula & Solved Examples",
                                hindi: "Distance Formula और हल किए गए उदाहरण"
                            },
                            description: {
                                english: "1. Distance between points P(x₁, y₁) and Q(x₂, y₂): PQ = √[(x₂ - x₁)² + (y₂ - y₁)²].\n\n2. Distance of point P(x, y) from origin O(0, 0): OP = √(x² + y²).\n\n3. Example: Points (3, 2), (-2, -3), (2, 3).\nPQ = √50 = 7.07; QR = √52 = 7.21; PR = √2 = 1.41. PQ² + PR² = 50 + 2 = 52 = QR² → right triangle at P.\n\n4. Example: Points (1, 7), (4, 2), (-1, -1), (-4, 4) form a square.\nAB = BC = CD = DA = √34; AC = BD = √68. All sides equal, diagonals equal → square.\n\n5. Example: Points A(3, 1), B(6, 4), C(8, 6). AB = 3√2, BC = 2√2, AC = 5√2. AB + BC = AC → collinear.\n\n6. Example: Find relation between x and y such that (x, y) is equidistant from (7, 1) and (3, 5).\n(x - 7)² + (y - 1)² = (x - 3)² + (y - 5)² → x - y = 2.\n\n7. Example: Point on y-axis equidistant from A(6, 5) and B(-4, 3).\n(0, y): 36 + (5 - y)² = 16 + (3 - y)² → 4y = 36 → y = 9. Point is (0, 9).\n\nKeywords: distance formula, origin, right triangle, square, collinear, equidistant, y-axis, examples"
                            },
                            diagrams: null
                        },
                        {
                            id: "math_c19_20261026_120000",
                            display_name: {
                                english: "Section Formula & Midpoint Formula",
                                hindi: "Section Formula और Midpoint Formula"
                            },
                            description: {
                                english: "1. Section Formula: Coordinates of point P(x, y) dividing line segment joining A(x₁, y₁) and B(x₂, y₂) internally in ratio m₁ : m₂ are:\nx = (m₁x₂ + m₂x₁)/(m₁ + m₂), y = (m₁y₂ + m₂y₁)/(m₁ + m₂).\n\n2. If ratio is k : 1: x = (kx₂ + x₁)/(k + 1), y = (ky₂ + y₁)/(k + 1).\n\n3. Midpoint Formula: Midpoint of A(x₁, y₁) and B(x₂, y₂) is ((x₁ + x₂)/2, (y₁ + y₂)/2).\n\n4. Example: Point dividing (4, -3) and (8, 5) in ratio 3 : 1 internally.\nx = (3×8 + 1×4)/4 = 7; y = (3×5 + 1×(-3))/4 = 3. Point is (7, 3).\n\n5. Example: In what ratio does (-4, 6) divide line joining A(-6, 10) and B(3, -8)?\n-4 = (3m₁ - 6m₂)/(m₁ + m₂) → m₁ : m₂ = 2 : 7.\n\n6. Example: Trisection points of line segment joining A(2, -2) and B(-7, 4).\nP divides in 1 : 2 → (-1, 0); Q divides in 2 : 1 → (-4, 2).\n\n7. Example: Ratio in which y-axis divides line joining (5, -6) and (-1, -4).\nLet ratio be k : 1. x-coordinate = 0 → (-k + 5)/(k + 1) = 0 → k = 5. Ratio is 5 : 1. Point is (0, -13/3).\n\n8. Example: Parallelogram A(6, 1), B(8, 2), C(9, 4), D(p, 3). Diagonals bisect each other.\nMidpoint of AC = Midpoint of BD → (15/2, 5/2) = ((8 + p)/2, 5/2) → p = 7.\n\nKeywords: section formula, midpoint formula, ratio, trisection, y-axis, parallelogram, diagonals, examples"
                            },
                            diagrams: null
                        }
                    ]
                }
            ]
        }
    ]
};
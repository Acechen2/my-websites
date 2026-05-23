/* ==========================================================================
   LearningHub - 全科数据仓库 (data.js) - v3.0 Lite
   ========================================================================== */

const StudyData = {
    // 每日名言推荐库
    quotes: [
        { text: "生如逆旅，一苇以航。", author: "苏轼" },
        { text: "学而不思则罔，思而不学则殆。", author: "孔子" },
        { text: "路漫漫其修远兮，吾将上下而求索。", author: "屈原" },
        { text: "博学之，审问之，慎思之，明辨之，笃行之。", author: "《礼记》" },
        { text: "每一行代码都是通往未来的一块砖石。", author: "Geek Explorer" },
        { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
        { text: "Stay hungry, stay foolish.", author: "Steve Jobs" }
    ],

    // ==========================================
    // 1. 语文古风阁数据
    // ==========================================
    chinese: {
        poetry: [
            {
                id: "pipaxing",
                title: "琵琶行（节选）",
                author: "白居易",
                lines: [
                    "浔阳江头夜送客", "枫叶荻花秋瑟瑟",
                    "主人下马客在船", "举酒欲饮无管弦",
                    "醉不成欢惨将别", "别时茫茫江浸月",
                    "忽闻水上琵琶声", "主人忘归客不发",
                    "寻声暗问弹者谁", "琵琶声停欲语迟",
                    "移船相近邀相见", "添酒回灯重开宴",
                    "千呼万唤始出来", "犹抱琵琶半遮面"
                ],
                gaps: [1, 3, 5, 7, 9, 12, 13]
            },
            {
                id: "jiangjinjiu",
                title: "将进酒",
                author: "李白",
                lines: [
                    "君不见黄河之水天上来", "奔流到海不复回",
                    "君不见高堂明镜悲白发", "朝如青丝暮成雪",
                    "人生得意须尽欢", "莫使金樽空对月",
                    "天生我材必有用", "千金散尽还复来",
                    "烹羊宰牛且为乐", "会须一饮三百杯",
                    "岑夫子", "丹丘生", "将进酒", "杯莫停",
                    "与君歌一曲", "请君为我倾耳听",
                    "钟鼓馔玉不足贵", "但愿长醉不复醒",
                    "古来圣贤皆寂寞", "惟有饮者留其名"
                ],
                gaps: [1, 3, 5, 7, 9, 14, 17, 19]
            },
            {
                id: "loushimiing",
                title: "陋室铭",
                author: "刘禹锡",
                lines: [
                    "山不在高", "有仙则名",
                    "水不在深", "有龙则灵",
                    "斯是陋室", "惟吾德馨",
                    "苔痕上阶绿", "草色入帘青",
                    "谈笑有鸿儒", "往来无白丁",
                    "可以调素琴", "阅金经",
                    "无丝竹之乱耳", "无案牍之劳形",
                    "南阳诸葛庐", "西蜀子云亭",
                    "孔子云", "何陋之有"
                ],
                gaps: [1, 3, 5, 7, 9, 12, 13, 17]
            }
        ],
        vocabulary: [
            { char: "以", type: "虚词", meaning: "① 介词：表示凭借、用，如“以刀劈之”。② 连词：表示目的，来、用来，如“属予作文以记之”。③ 介词：表示时间、原因，因为，如“扶苏以数谏故”。", sentence: "属予作文以记之 ———《岳阳楼记》" },
            { char: "而", type: "虚词", meaning: "① 连词：表示并列，又、而且。② 连词：表示顺承，就、然后。③ 连词：表示转折，但是、却，如“青，取之于蓝而青于蓝”。④ 连词：表示修饰关系，着、地，如“临溪而渔”。", sentence: "青，取之于蓝而青于蓝 ———《劝学》" },
            { char: "之", type: "虚词", meaning: "① 助词：的，如“小大之狱”。② 代词：代人、代事、代物，如“择其善者而从之”。③ 动词：往、到...去，如“吾欲之南海”。④ 助词：提宾/宾语前置标志，如“何陋之有”。", sentence: "孔子云：何陋之有？ ———《陋室铭》" },
            { char: "其", type: "虚词", meaning: "① 代词：他的、它的、他们的，如“工欲善其事，必先利其器”。② 指示代词：那、那些，如“以其境过清”。③ 副词：表示推测、祈使语气，大概、可要，如“其真无马邪”。", sentence: "安陵君其许寡人。 ———《唐雎不辱使命》" }
        ]
    },

    // ==========================================
    // 2. 数学空间数据
    // ==========================================
    math: {
        formulas: [
            { left: "sin(α + β)", right: "sinαcosβ + cosαsinβ", tip: "两角和的正弦公式，注意“正余余正，符号相同”" },
            { left: "cos(α + β)", right: "cosαcosβ - sinαsinβ", tip: "两角和的余弦公式，注意“余余正正，符号相反”" },
            { left: "sin(2α)", right: "2sinαcosα", tip: "二倍角正弦公式，常用于公式化简" },
            { left: "cos(2α)", right: "cos²α - sin²α", tip: "二倍角余弦公式，另外变形为 2cos²α-1 或 1-2sin²α" },
            { left: "(x^n)'", right: "n*x^(n-1)", tip: "幂函数的导数公式 (x 的 n 次方的导数)" },
            { left: "(lnx)'", right: "1/x", tip: "自然对数函数的导数公式 (x > 0)" }
        ],
        problems: [
            {
                q: "已知椭圆的方程为 x²/a² + y²/b² = 1 (a > b > 0)，若焦距为 2c，且离心率 e = c/a = 1/2，若 a = 4，求该椭圆的短半轴长 b 的值。",
                ans: "2*sqrt(3)",
                solution: "步骤如下：\n1. 由已知离心率 e = c/a = 1/2 且 a = 4，可算出 c = 2。\n2. 在椭圆中，满足 a² = b² + c²。\n3. 代入数据：4² = b² + 2² => 16 = b² + 4 => b² = 12。\n4. 所以短半轴 b = sqrt(12) = 2*sqrt(3) (约等于 3.46)。"
            },
            {
                q: "求过点 P(2, 3) 且在两坐标轴上截距绝对值相等的直线方程。",
                ans: "x+y-5=0或x-y+1=0或3x-2y=0",
                solution: "分情况讨论过原点与不过原点，整理得三条直线方程：x+y-5=0 或 x-y+1=0 或 3x-2y=0。"
            }
        ]
    },

    // ==========================================
    // 3. 英语驿站数据
    // ==========================================
    english: {
        words: [
            { word: "algorithm", phonetic: "/ˈælɡərɪðəm/", meaning: "n. 算法，运算法则" },
            { word: "variable", phonetic: "/ˈveəriəbl/", meaning: "n. 变量  adj. 易变的，可变的" },
            { word: "inheritance", phonetic: "/ɪnˈherɪtəns/", meaning: "n. 继承，遗传物" },
            { word: "polymorphism", phonetic: "/ˌpɒlɪˈmɔːfɪzəm/", meaning: "n. 多态性" },
            { word: "asynchronous", phonetic: "/eɪˈsɪŋkrənəs/", meaning: "adj. 异步的，不同步的" }
        ],
        translations: [
            {
                type: "E-to-C",
                source: "As the saying goes, where there is a will, there is a way.",
                ref: "常言道：有志者，事竟成。",
                keywords: "where there is a will (有志向)"
            },
            {
                type: "C-to-E",
                source: "实践是检验真理的唯一标准。",
                ref: "Practice is the sole criterion for testing truth.",
                keywords: "sole criterion (唯一标准), testing truth (检验真理)"
            }
        ]
    },

    // ==========================================
    // 4. Python 专业课填空题
    // ==========================================
    python: {
        codeExercises: [
            {
                title: "定义函数与返回值",
                codeLines: [
                    "[blank1] sum_two_numbers(a, b):",
                    "    # 计算并返回两数之和",
                    "    [blank2] a + b"
                ],
                blanks: {
                    blank1: { ans: "def", desc: "声明函数的关键字" },
                    blank2: { ans: "return", desc: "将计算结果返回给调用者的关键字" }
                }
            },
            {
                title: "for 循环结构",
                codeLines: [
                    "numbers = [1, 2, 3]",
                    "[blank1] num [blank2] numbers:",
                    "    print(num)"
                ],
                blanks: {
                    blank1: { ans: "for", desc: "循环的启动关键字" },
                    blank2: { ans: "in", desc: "遍历序列的所属关键字" }
                }
            },
            {
                title: "列表元素追加",
                codeLines: [
                    "fruits = ['apple']",
                    "fruits.[blank1]('orange')",
                    "print(fruits)"
                ],
                blanks: {
                    blank1: { ans: "append", desc: "向列表末尾添加单个元素的方法名称" }
                }
            }
        ],
        conceptExercises: [
            {
                q: "在 Python 中，用于声明或定义面向对象中「类」的核心关键字是 ________。",
                ans: ["class"],
                solution: "解析：使用 class 关键字可以创建一个类。例如：class Student:"
            },
            {
                q: "在 Python 基础数据类型中，代表不可变序列、用圆括号 () 包裹的类型是 ________ (填中文或英文名称均可)。",
                ans: ["tuple", "元组"],
                solution: "解析：元组 (tuple) 是一系列有序且不可修改的数据集合，使用圆括号包裹。"
            },
            {
                q: "Python 中用于把任意类型数据强制转换为整型的内置函数名称是 ________ 函数。",
                ans: ["int", "int()"],
                solution: "解析：int() 函数可以将浮点数或数字字符串转换为整数值。"
            }
        ]
    },

    // ==========================================
    // 5. MySQL 数据库填空题
    // ==========================================
    mysql: {
        codeExercises: [
            {
                title: "数据条件查询",
                codeLines: [
                    "[blank1] name, age FROM students",
                    "[blank2] age >= 18;"
                ],
                blanks: {
                    blank1: { ans: "SELECT", desc: "指定需要查询字段的关键字" },
                    blank2: { ans: "WHERE", desc: "设定查询条件子句的关键字" }
                }
            },
            {
                title: "新增表数据",
                codeLines: [
                    "[blank1] INTO students (id, name)",
                    "[blank2] (1006, '赵六');"
                ],
                blanks: {
                    blank1: { ans: "INSERT", desc: "插入语句的动作关键字" },
                    blank2: { ans: "VALUES", desc: "指定待填充数据元组的关键字" }
                }
            },
            {
                title: "连接查询 (JOIN)",
                codeLines: [
                    "SELECT s.name, c.score",
                    "FROM students s",
                    "INNER [blank1] scores c",
                    "[blank2] s.id = c.student_id;"
                ],
                blanks: {
                    blank1: { ans: "JOIN", desc: "将多张表内连接进行关联的关键字" },
                    blank2: { ans: "ON", desc: "设定多表关联匹配字段的主词" }
                }
            }
        ],
        conceptExercises: [
            {
                q: "在 MySQL 数据表中，为了让某整型主键字段在插入记录时自动递增，应为其添加 ________ 属性修饰词。",
                ans: ["auto_increment", "AUTO_INCREMENT"],
                solution: "解析：AUTO_INCREMENT 是 MySQL 特有的自动增长属性，常用于 ID 主键。"
            },
            {
                q: "在 SQL 语句中，用于删除整个物理表结构及其所有数据的 DDL 关键字是 ________。",
                ans: ["drop", "DROP"],
                solution: "解析：DROP TABLE 会连同数据和表结构一起从数据库中永久清除；而 DELETE 仅清除表中的行。"
            },
            {
                q: "SQL 语句中，要想按照特定字段对查询结果集进行升序或降序排列，需要使用 ________ 子句。",
                ans: ["order by", "ORDER BY"],
                solution: "解析：ORDER BY 子句可对数据进行排序，默认是升序 (ASC)，降序需要添加 DESC。"
            }
        ]
    },

    // ==========================================
    // 6. 网页制作填空题
    // ==========================================
    webDesign: {
        codeExercises: [
            {
                title: "网页超链接",
                codeLines: [
                    "<a [blank1]=\"https://google.com\">谷歌官网</a>"
                ],
                blanks: {
                    blank1: { ans: "href", desc: "超链接指定目标 URL 的核心属性名" }
                }
            },
            {
                title: "CSS 弹性盒布局",
                codeLines: [
                    ".container {",
                    "    [blank1]: flex;",
                    "    justify-content: center;",
                    "}"
                ],
                blanks: {
                    blank1: { ans: "display", desc: "设置容器定位和显示模式的 CSS 属性名" }
                }
            },
            {
                title: "HTML5 精美图片嵌入",
                codeLines: [
                    "<img [blank1]=\"logo.png\" [blank2]=\"平台标志\">"
                ],
                blanks: {
                    blank1: { ans: "src", desc: "指定图片路径的属性" },
                    blank2: { ans: "alt", desc: "当图片加载失败时显示的替换文本属性" }
                }
            }
        ],
        conceptExercises: [
            {
                q: "在 HTML 标签中，用于定义无序列表容器的标签名称是 ________ 标签。",
                ans: ["ul", "<ul>"],
                solution: "解析：ul 是无序列表 (unordered list) 的容器，每一项由 li (list item) 表示。"
            },
            {
                q: "在 CSS 样式中，若要为文字设置大小/字号，需要修改的属性名称是 ________。",
                ans: ["font-size", "fontsize"],
                solution: "解析：font-size 属性控制文本呈现大小。常见单位有 px, em, rem 等。"
            },
            {
                q: "在 HTML 基础元素中，用于在网页中创建用户能直接输入内容的单行文本输入框标签是 ________ 标签。",
                ans: ["input", "<input>"],
                solution: "解析：input 标签可以通过设置 type=\"text\" 变成一个标准的单行动态输入框。"
            }
        ]
    },

    // ==========================================
    // 7. 网络技术填空题
    // ==========================================
    networking: {
        codeExercises: [
            {
                title: "测试网络连通性",
                codeLines: [
                    "[blank1] 192.168.1.1"
                ],
                blanks: {
                    blank1: { ans: "ping", desc: "通过发送ICMP报文来检查目标主机是否可达的网络诊断工具" }
                }
            },
            {
                title: "查看本机所有网络配置",
                codeLines: [
                    "[blank1] /all"
                ],
                blanks: {
                    blank1: { ans: "ipconfig", desc: "Windows 系统下查看本机网卡、IP及网卡 MAC 的控制台命令" }
                }
            },
            {
                title: "解析域名关联 IP 地址",
                codeLines: [
                    "[blank1] www.baidu.com"
                ],
                blanks: {
                    blank1: { ans: "nslookup", desc: "查询域名系统 DNS 记录的经典网络诊断命令" }
                }
            }
        ],
        conceptExercises: [
            {
                q: "在计算机网络局域网中，专门用于自动分发并管理主机客户端 IP 地址的协议是 ________ 协议。",
                ans: ["dhcp", "DHCP"],
                solution: "解析：DHCP (Dynamic Host Configuration Protocol) 动态主机配置协议能够自动分配IP、网关及DNS。"
            },
            {
                q: "OSI 七层网络模型中，专门负责进行逻辑寻址与路由选择，并使用路由器进行网段数据包转发的是 ________ 层。",
                ans: ["网络层", "网络"],
                solution: "解析：网络层 (Network Layer) 负责路径选择与转发寻址，核心协议就是 IP 协议。"
            },
            {
                q: "家庭路由器中，用于将局域网私有 IP 转换为公网有效真实 IP 进行因特网通信的技术缩写是 ________ 术。",
                ans: ["nat", "NAT"],
                solution: "解析：NAT (Network Address Translation) 网络地址转换技术能节约公网IP资源，确保多台局域网主机共用IP上网。"
            }
        ]
    }
};

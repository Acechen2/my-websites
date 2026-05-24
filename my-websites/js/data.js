/* ==========================================================================
   LearningHub - 全科数据仓库 (data.js) - v4.0 Zero-Point Edition
   ========================================================================== */

const StudyData = {
    // 每日名言推荐库
    quotes: [
        { text: "生如逆旅，一苇以航。", author: "苏轼" },
        { text: "学而不思则罔，思而不学则殆。", author: "孔子" },
        { text: "路漫漫其修远兮，吾将上下而求索。", author: "屈原" },
        { text: "天行健，君子以自强不息。", author: "《周易》" },
        { text: "博学之，审问之，慎思之，明辨之，笃行之。", author: "《礼记》" },
        { text: "每一行代码都是通往未来的一块砖石。", author: "Geek Explorer" },
        { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
        { text: "Stay hungry, stay foolish.", author: "Steve Jobs" }
    ],

    // ==========================================
    // 1. 语文古风阁数据 (对齐第一、二、七单元及古诗诵读基础篇目)
    // ==========================================
    chinese: {
        poetry: [
            {
                id: "guoshang",
                title: "国殇（节选）",
                author: "屈原",
                lines: [
                    "操吴戈兮被犀甲", "车错毂兮短兵接",
                    "旌蔽日兮敌若云", "矢交坠兮士争先",
                    "凌余阵兮躞余行", "左骖殪兮右刃伤",
                    "霾两轮兮絷四马", "援玉枹兮击鸣鼓",
                    "天时怼兮威灵怒", "严杀尽兮弃原野"
                ],
                gaps: [1, 3, 5, 7, 9] // 挖空奇数句（零索引为 1, 3, 5, 7, 9）
            },
            {
                id: "guiyuantianju",
                title: "归园田居（其一）（节选）",
                author: "陶渊明",
                lines: [
                    "少无适俗韵", "性本爱丘山",
                    "误落尘网中", "一去三十年",
                    "羁鸟恋旧林", "池鱼思故渊",
                    "开荒南野际", "守拙归园田",
                    "方宅十余亩", "草屋八九间"
                ],
                gaps: [1, 3, 5, 7, 9]
            },
            {
                id: "denggao",
                title: "登高",
                author: "杜甫",
                lines: [
                    "风急天高猿啸哀", "渚清沙白鸟飞回",
                    "无边落木萧萧下", "不尽长江滚滚来",
                    "万里悲秋常作客", "百年多病独登台",
                    "艰难苦恨繁霜鬓", "潦倒新停浊酒杯"
                ],
                gaps: [1, 3, 5, 7]
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
    // 2. 数学空间数据 (对齐第一、二、三章绝对基础知识)
    // ==========================================
    math: {
        formulas: [
            { left: "A ∩ B", right: "{x | x ∈ A 且 x ∈ B}", tip: "集合的交集定义，代表同时属于集合 A 与集合 B 的元素" },
            { left: "|x| < a (a > 0)", right: "-a < x < a", tip: "含绝对值不等式性质，代表数轴上到原点的距离小于 a 的点集" },
            { left: "sin²α + cos²α", right: "1", tip: "同角三角函数的基本平方和恒等式" },
            { left: "tanα", right: "sinα / cosα", tip: "正切函数与正弦、余弦函数的关系" },
            { left: "a_n (等差通项)", right: "a_1 + (n-1)*d", tip: "等差数列的通项公式，其中 d 是公差" },
            { left: "a_n (等比通项)", right: "a_1 * q^(n-1)", tip: "等比数列的通项公式，其中 q 是公比" }
        ],
        problems: [
            {
                q: "已知集合 A = {1, 2, 3}，集合 B = {2, 3, 4}，求两集合的交集 A ∩ B。",
                ans: "{2, 3} 或 {2,3}",
                solution: "步骤如下：\n1. 根据集合交集的定义，A ∩ B 代表所有同时属于集合 A 且属于集合 B 的元素组成的集合。\n2. 观察集合中，元素 2 和 3 既在 A 中又在 B 中。\n3. 因此交集 A ∩ B = {2, 3}。"
            },
            {
                q: "求一元二次不等式 x² - 3x + 2 < 0 的解集。",
                ans: "1<x<2 或 (1,2) 或 (1, 2)",
                solution: "步骤如下：\n1. 先将对应方程 x² - 3x + 2 = 0 进行因式分解，得 (x - 1)(x - 2) = 0。\n2. 算出方程的两个实数根为 x₁ = 1, x₂ = 2。\n3. 二次项系数为 1 > 0，不等号为 <，故解集在两根之间。\n4. 所以解集为 1 < x < 2，或者表示为开区间 (1, 2)。"
            }
        ]
    },

    // ==========================================
    // 3. 英语驿站数据 (对齐第一、二单元基础校园生活与购物词汇)
    // ==========================================
    english: {
        words: [
            { word: "vocabulary", phonetic: "/vəˈkæbjuləri/", meaning: "n. 词汇，词汇量" },
            { word: "term", phonetic: "/tɜːm/", meaning: "n. 学期，条款" },
            { word: "manner", phonetic: "/ˈmænə/", meaning: "n. 礼貌，举止，方式" },
            { word: "shopping", phonetic: "/ˈʃɒpɪŋ/", meaning: "n. 购物，买东西" },
            { word: "customer", phonetic: "/ˈkʌstəmə/", meaning: "n. 顾客，客户" }
        ],
        translations: [
            {
                type: "E-to-C",
                source: "Nice to meet you on the first day of school.",
                ref: "很高兴在开学第一天见到你。",
                keywords: "meet you (见到你), first day (第一天), school (开学/学校)"
            },
            {
                type: "C-to-E",
                source: "你能告诉我去购物中心的路怎么走吗？",
                ref: "Could you tell me the way to the shopping mall?",
                keywords: "Could you tell me (你能告诉我), the way (路), shopping mall (购物中心)"
            }
        ]
    },

    // ==========================================
    // 4. Python 编程 (从 Print、变量及分支结构等基础起步)
    // ==========================================
    python: {
        codeExercises: [
            {
                title: "Python 输出 Hello World",
                codeLines: [
                    "[blank1](\"Hello World\")"
                ],
                blanks: {
                    blank1: { ans: "print", desc: "在终端或控制台打印输出文本的内置函数名" }
                }
            },
            {
                title: "变量赋值与强制类型转换",
                codeLines: [
                    "a = [blank1](\"10\")",
                    "b = 5",
                    "c = a [blank2] b"
                ],
                blanks: {
                    blank1: { ans: "int", desc: "将数字字符串转换为整型数的内置函数名" },
                    blank2: { ans: "+", desc: "算术加法运算符" }
                }
            },
            {
                title: "if-else 选择结构",
                codeLines: [
                    "x = 5",
                    "[blank1] x > 0:",
                    "    print(\"正数\")",
                    "[blank2]:",
                    "    print(\"非正数\")"
                ],
                blanks: {
                    blank1: { ans: "if", desc: "判断条件是否成立的启动关键字" },
                    blank2: { ans: "else", desc: "当 if 条件不满足时执行的备用分支关键字" }
                }
            }
        ],
        conceptExercises: [
            {
                q: "在 Python 中，用于在终端或屏幕上输出打印指定文本内容的内置函数是 ________。",
                ans: ["print", "print()"],
                solution: "解析：print() 函数是 Python 中最基本、最常用的控制台输出函数。"
            },
            {
                q: "在 Python 程序中，用于书写单行注释的半角文本字符符号是 ________。",
                ans: ["#"],
                solution: "解析：Python 中使用 '#' 符号作为单行注释符号，解释器会忽略其后面的文字。"
            },
            {
                q: "用于从键盘接收用户的终端输入，并默认返回字符串类型数据的内置函数是 ________。",
                ans: ["input", "input()"],
                solution: "解析：input() 函数用于交互式获取用户在控制台的输入，返回的数据类型始终是 str。"
            }
        ]
    },

    // ==========================================
    // 5. MySQL 数据库 (从库表创建与 DML 基本增改起步)
    // ==========================================
    mysql: {
        codeExercises: [
            {
                title: "创建新数据库",
                codeLines: [
                    "[blank1] [blank2] school;"
                ],
                blanks: {
                    blank1: { ans: "CREATE", desc: "创建资源对象的 SQL 动作字" },
                    blank2: { ans: "DATABASE", desc: "表示要创建的对象是数据库的关键字" }
                }
            },
            {
                title: "删除已有数据库",
                codeLines: [
                    "[blank1] [blank2] school;"
                ],
                blanks: {
                    blank1: { ans: "DROP", desc: "彻底删除表结构或数据库的 DDL 关键字" },
                    blank2: { ans: "DATABASE", desc: "表示要删除数据库的关键字" }
                }
            },
            {
                title: "创建简单数据表",
                codeLines: [
                    "CREATE [blank1] users (",
                    "    id INT PRIMARY KEY,",
                    "    name [blank2](20)",
                    ");"
                ],
                blanks: {
                    blank1: { ans: "TABLE", desc: "表示要创建的对象是数据表的关键字" },
                    blank2: { ans: "VARCHAR", desc: "MySQL 中代表可变长度字符串的字符数据类型" }
                }
            },
            {
                title: "向表中新增记录",
                codeLines: [
                    "[blank1] INTO users (id, name)",
                    "[blank2] (1, '张三');"
                ],
                blanks: {
                    blank1: { ans: "INSERT", desc: "数据插入操作的 SQL 动作词" },
                    blank2: { ans: "VALUES", desc: "指定需要插入的数据元组值的关键字" }
                }
            }
        ],
        conceptExercises: [
            {
                q: "在数据库技术中，用于管理、维护和运行数据库的庞大系统软件统称为 ________ (填大写英文缩写)。",
                ans: ["DBMS", "dbms"],
                solution: "解析：DBMS 的全称是 Database Management System，即数据库管理系统，如 MySQL。"
            },
            {
                q: "在 SQL 语言中，用于定义数据库、表、索引结构的指令（如 CREATE、DROP）统称为 ________ (填大写英文缩写) 语言。",
                ans: ["DDL", "ddl"],
                solution: "解析：DDL 全称是 Data Definition Language，即数据定义语言，专门用于维护数据库与表结构。"
            },
            {
                q: "在 SQL 的 SELECT 查询语句中，如果想要对查询结果中重复的某列字段进行去重合并，需要使用关键字 ________。",
                ans: ["DISTINCT", "distinct"],
                solution: "解析：DISTINCT 关键字可以滤除查询结果中完全重复的记录行，常用于字段去重统计。"
            }
        ]
    },

    // ==========================================
    // 6. 网页制作 (从 HTML 骨架、段落标题等最基础标记起步)
    // ==========================================
    webDesign: {
        codeExercises: [
            {
                title: "网页最基础 HTML 骨架",
                codeLines: [
                    "<!DOCTYPE html>",
                    "<[blank1] lang=\"zh-CN\">",
                    "<head>",
                    "    <meta charset=\"UTF-8\">",
                    "    <title>我的网页</title>",
                    "</head>",
                    "<[blank2]>",
                    "    <h1>网页制作零起点</h1>",
                    "</[blank2]>",
                    "</[blank1]>"
                ],
                blanks: {
                    blank1: { ans: "html", desc: "HTML 文档的根标签名" },
                    blank2: { ans: "body", desc: "网页主体内容标签名" }
                }
            },
            {
                title: "网页超链接属性",
                codeLines: [
                    "<a [blank1]=\"https://google.com\">访问谷歌</a>"
                ],
                blanks: {
                    blank1: { ans: "href", desc: "超链接指定跳转目标 URL 的核心属性名" }
                }
            },
            {
                title: "网页标题与普通段落",
                codeLines: [
                    "<[blank1]>网页设计起步</[blank1]>",
                    "<[blank2]>从最简单的标签学起，持之以恒。</[blank2]>"
                ],
                blanks: {
                    blank1: { ans: "h1", desc: "最高权重的一级标题标签" },
                    blank2: { ans: "p", desc: "普通文本段落标签" }
                }
            }
        ],
        conceptExercises: [
            {
                q: "网页设计与制作的最核心标记语言 HTML，其完整的中文名称是 ________ 语言。",
                ans: ["超文本标记语言"],
                solution: "解析：HTML 全称是 HyperText Markup Language，即超文本标记语言，是构成网页的骨架。"
            },
            {
                q: "在 HTML 网页头部的 <head> 内部，专门用于定义网页在浏览器标签页上显示的标题标签是 ________ 标签。",
                ans: ["title", "<title>"],
                solution: "解析：<title> 标签定义的文本会直接显示在浏览器窗口的标签栏或收藏夹中。"
            },
            {
                q: "在 HTML 基础元素中，用于定义无序列表（Unordered List）容器的专属标签是 ________ 标签。",
                ans: ["ul", "<ul>"],
                solution: "解析：<ul> 标签在网页中建立无序列表骨架，列表里的每一项使用 <li> 标签包裹。"
            }
        ]
    },

    // ==========================================
    // 7. 网络技术 (从局域网分类、拓扑、Ping 及 ipconfig 基本指令起步)
    // ==========================================
    networking: {
        codeExercises: [
            {
                title: "测试本地 TCP/IP 协议栈 (环回地址)",
                codeLines: [
                    "[blank1] 127.0.0.1"
                ],
                blanks: {
                    blank1: { ans: "ping", desc: "用于在命令行测试网络连通性与丢包率的 ICMP 经典命令" }
                }
            },
            {
                title: "查看本机网卡最基础的 IP 配置参数",
                codeLines: [
                    "[blank1]"
                ],
                blanks: {
                    blank1: { ans: "ipconfig", desc: "Windows 系统下快速查看本机各网卡 IPv4 状态的命令" }
                }
            }
        ],
        conceptExercises: [
            {
                q: "在计算机网络按地理范围分类中，覆盖范围通常在几公里以内、一栋大楼或一个学校内的网络称为 ________ (填大写英文缩写)。",
                ans: ["LAN", "lan"],
                solution: "解析：LAN 代表 Local Area Network，即局域网，与广域网 WAN 相对。"
            },
            {
                q: "在计算机网络分类中，覆盖范围跨越城市、国家甚至全球的庞大网络（如 Internet）称为 ________ (填大写英文缩写)。",
                ans: ["WAN", "wan"],
                solution: "解析：WAN 代表 Wide Area Network，即广域网，因特网就是全球最大的广域网。"
            },
            {
                q: "在计算机网络中，用于表示连接在一起的计算机与网络设备的物理或逻辑形状的排列结构称为网络 ________。",
                ans: ["拓扑结构", "拓扑"],
                solution: "解析：网络拓扑结构（星型、环型、总线型、网状型）决定了物理设备的互连布局与数据传输路径。"
            }
        ]
    }
};

/* ==========================================================================
   LearningHub - 网络技术配置指令与概念填空模块 (networking.js)
   ========================================================================== */

const NetworkingModule = {
    currentCodeIndex: 0,
    currentConceptIndex: 0,

    init() {
        this.bindEvents();
        this.loadCodeChallenge();
        this.loadConceptChallenge();
    },

    bindEvents() {
        // 选项卡切换
        const tabs = document.querySelectorAll("#view-networking .tab-btn");
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                
                const target = tab.dataset.tab;
                document.querySelectorAll("#view-networking .tab-content").forEach(tc => tc.classList.remove("active"));
                document.getElementById(`tab-${target}`).classList.add("active");
            });
        });

        // 绑定代码/命令补全按钮
        document.getElementById("btn-submit-net-code").addEventListener("click", () => this.verifyCodeAnswers());
        document.getElementById("btn-show-net-code").addEventListener("click", () => this.showCodeAnswers());
        document.getElementById("btn-next-net-code").addEventListener("click", () => this.navigateCode(1));

        // 绑定概念填空按钮
        document.getElementById("btn-submit-net-concept").addEventListener("click", () => this.verifyConceptAnswer());
        document.getElementById("btn-show-net-concept").addEventListener("click", () => this.showConceptAnswer());
        document.getElementById("btn-next-net-concept").addEventListener("click", () => this.navigateConcept(1));
        document.getElementById("btn-net-hint").addEventListener("click", () => this.showQuestionHint());

        // 回车提交支持
        document.getElementById("net-concept-input").addEventListener("keypress", (e) => {
            if (e.key === "Enter") this.verifyConceptAnswer();
        });
    },

    // ==========================================
    // 7.1 网络指令补全
    // ==========================================
    loadCodeChallenge() {
        const ex = StudyData.networking.codeExercises[this.currentCodeIndex];
        const box = document.getElementById("net-code-box");
        box.innerHTML = "";

        // 隐藏查看答案按钮
        document.getElementById("btn-show-net-code").classList.add("hidden");

        ex.codeLines.forEach(line => {
            const lineDiv = document.createElement("div");
            
            // 保护缩进格式
            let leadingSpaces = line.match(/^ +/);
            let indentHTML = "";
            let cleanLine = line;
            
            if (leadingSpaces) {
                const spaceCount = leadingSpaces[0].length;
                indentHTML = `<span style="display:inline-block; width: ${spaceCount * 9}px;"></span>`;
                cleanLine = line.substring(spaceCount);
            }

            // 正则匹配替换 [blankX] 占位符
            const processedLine = cleanLine.replace(/\[(blank\d+)\]/g, (match, blankKey) => {
                const blankData = ex.blanks[blankKey];
                return `<input type="text" class="code-inline-input" 
                               data-answer="${blankData.ans}" 
                               data-desc="${blankData.desc}" 
                               title="提示：${blankData.desc}"
                               autocomplete="off">`;
            });

            lineDiv.innerHTML = indentHTML + processedLine;
            box.appendChild(lineDiv);
        });

        // 绑定输入框自动检测样式
        const inputs = box.querySelectorAll(".code-inline-input");
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                input.className = "code-inline-input";
            });
        });
    },

    verifyCodeAnswers() {
        const ex = StudyData.networking.codeExercises[this.currentCodeIndex];
        const inputs = document.querySelectorAll("#net-code-box .code-inline-input");
        
        // 严格非空核验：防止空提交骗取答案
        let hasEmpty = false;
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.className = "code-inline-input incorrect";
                input.style.animation = "shake 0.4s";
                setTimeout(() => input.style.animation = "", 400);
                hasEmpty = true;
            }
        });
        if (hasEmpty) {
            App.showToast("请先完成作答", "指令中尚有空白未填，请全部填齐后再提交比对并解锁答案！", "error");
            return;
        }

        let allCorrect = true;
        inputs.forEach(input => {
            const userVal = input.value.trim();
            const realVal = input.dataset.answer;

            if (userVal.toLowerCase() === realVal.toLowerCase()) {
                input.className = "code-inline-input correct";
            } else {
                input.className = "code-inline-input incorrect";
                allCorrect = false;

                // 抖动效果
                input.style.animation = "shake 0.4s";
                setTimeout(() => input.style.animation = "", 400);
            }
        });

        // 提交即解锁答案按钮
        document.getElementById("btn-show-net-code").classList.remove("hidden");

        if (allCorrect) {
            App.showToast("网络指令补全成功！", "网络检测命令与配置参数拼写完全正确！经验值+20", "success");
            App.awardExp(20, "成功拼写补全网络测试命令：" + ex.title);
            App.completeTask("networking-calc");
        } else {
            App.showToast("命令或配置拼错啦", "红色高亮的输入框可能拼写有误，请对照提示修改！", "error");
        }
    },

    showCodeAnswers() {
        const inputs = document.querySelectorAll("#net-code-box .code-inline-input");
        inputs.forEach(input => {
            input.value = input.dataset.answer;
            input.className = "code-inline-input correct";
        });
        App.showToast("标准网络配置命令已显示", "可以仔细观察 cmd 经典网络指令结构进行记忆！", "info");
    },

    navigateCode(dir) {
        const count = StudyData.networking.codeExercises.length;
        this.currentCodeIndex = (this.currentCodeIndex + dir + count) % count;
        this.loadCodeChallenge();
    },

    // ==========================================
    // 7.2 概念填空
    // ==========================================
    loadConceptChallenge() {
        const ce = StudyData.networking.conceptExercises[this.currentConceptIndex];
        
        document.getElementById("net-concept-text").textContent = ce.q;
        document.getElementById("net-concept-input").value = "";
        document.getElementById("net-concept-input").style.borderColor = "var(--border-light)";
        document.getElementById("net-concept-solution").classList.add("hidden");
        
        // 隐藏答案和提示按钮
        document.getElementById("btn-show-net-concept").classList.add("hidden");
        document.getElementById("btn-net-hint").classList.add("hidden");
    },

    verifyConceptAnswer() {
        const ce = StudyData.networking.conceptExercises[this.currentConceptIndex];
        const input = document.getElementById("net-concept-input");
        const userAns = input.value.trim().toLowerCase();
        
        // 严格非空校验
        if (userAns === "") {
            App.showToast("请先作答", "答案框为空，请输入您的概念答案后再提交并解锁答案！", "error");
            input.style.borderColor = "var(--color-rose)";
            input.style.animation = "shake 0.4s";
            setTimeout(() => input.style.animation = "", 400);
            return;
        }

        const isCorrect = ce.ans.some(ans => {
            const cleanAns = ans.trim().toLowerCase();
            return userAns === cleanAns || userAns.replace(/层/g, "") === cleanAns.replace(/层/g, "");
        });

        // 提交即解锁答案和提示按钮
        document.getElementById("btn-show-net-concept").classList.remove("hidden");
        document.getElementById("btn-net-hint").classList.remove("hidden");

        if (isCorrect) {
            input.style.borderColor = "var(--color-emerald)";
            App.showToast("回答正确！", "恭喜您答对了网络技术概念测试题！经验值+15", "success");
            App.awardExp(15, "解答网络技术概念填空题");
            this.showConceptSolutionPanel(true);
            App.completeTask("networking-quiz");
        } else {
            input.style.borderColor = "var(--color-rose)";
            input.style.animation = "shake 0.4s";
            setTimeout(() => input.style.animation = "", 400);
            App.showToast("答案不对哦", "请仔细回忆网络分层、设备与核心协议缩写，或直接查看提示。", "error");
        }
    },

    showConceptAnswer() {
        const ce = StudyData.networking.conceptExercises[this.currentConceptIndex];
        
        document.getElementById("net-concept-input").value = ce.ans[0];
        this.showConceptSolutionPanel(true);
        App.showToast("参考答案已显示", "请仔细核对解析进行巩固记忆！", "info");
    },

    showQuestionHint() {
        const ce = StudyData.networking.conceptExercises[this.currentConceptIndex];
        App.showToast("核心解题提示", ce.solution.split("。")[0] + "。", "info");
    },

    showConceptSolutionPanel(show) {
        const panel = document.getElementById("net-concept-solution");
        const ce = StudyData.networking.conceptExercises[this.currentConceptIndex];
        
        if (show) {
            panel.classList.remove("hidden");
            panel.innerHTML = `
                <div style="font-weight: 600; color: #ec4899; margin-bottom: 4px;">参考解析：</div>
                <div>${ce.solution}</div>
            `;
        } else {
            panel.classList.add("hidden");
        }
    },

    navigateConcept(dir) {
        const count = StudyData.networking.conceptExercises.length;
        this.currentConceptIndex = (this.currentConceptIndex + dir + count) % count;
        this.loadConceptChallenge();
    }
};

/* ==========================================================================
   LearningHub - 网页制作标签补全与概念填空模块 (web_design.js)
   ========================================================================== */

const WebDesignModule = {
    currentCodeIndex: 0,
    currentConceptIndex: 0,

    init() {
        this.bindEvents();
        this.loadCodeChallenge();
        this.loadConceptChallenge();
    },

    bindEvents() {
        // 选项卡切换
        const tabs = document.querySelectorAll("#view-web_design .tab-btn");
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                
                const target = tab.dataset.tab;
                document.querySelectorAll("#view-web_design .tab-content").forEach(tc => tc.classList.remove("active"));
                document.getElementById(`tab-${target}`).classList.add("active");
            });
        });

        // 绑定代码补全按钮
        document.getElementById("btn-submit-web-code").addEventListener("click", () => this.verifyCodeAnswers());
        document.getElementById("btn-show-web-code").addEventListener("click", () => this.showCodeAnswers());
        document.getElementById("btn-next-web-code").addEventListener("click", () => this.navigateCode(1));

        // 绑定概念填空按钮
        document.getElementById("btn-submit-web-concept").addEventListener("click", () => this.verifyConceptAnswer());
        document.getElementById("btn-show-web-concept").addEventListener("click", () => this.showConceptAnswer());
        document.getElementById("btn-next-web-concept").addEventListener("click", () => this.navigateConcept(1));

        // 回车提交支持
        document.getElementById("web-concept-input").addEventListener("keypress", (e) => {
            if (e.key === "Enter") this.verifyConceptAnswer();
        });
    },

    // ==========================================
    // 6.1 HTML / CSS 标签补全
    // ==========================================
    loadCodeChallenge() {
        const ex = StudyData.webDesign.codeExercises[this.currentCodeIndex];
        const box = document.getElementById("web-code-box");
        box.innerHTML = "";

        // 隐藏查看答案按钮
        document.getElementById("btn-show-web-code").classList.add("hidden");

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
        const ex = StudyData.webDesign.codeExercises[this.currentCodeIndex];
        const inputs = document.querySelectorAll("#web-code-box .code-inline-input");
        
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
            App.showToast("请先完成作答", "HTML/CSS属性尚有空白，请全部填齐后再提交比对并解锁答案！", "error");
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
        document.getElementById("btn-show-web-code").classList.remove("hidden");

        if (allCorrect) {
            App.showToast("网页标签补全成功！", "HTML / CSS 语法标记拼写完全正确！经验值+20", "success");
            App.awardExp(20, "成功拼写补全网页标签代码：" + ex.title);
            App.completeTask("web-design");
        } else {
            App.showToast("有标签属性拼错啦", "红色高亮的输入框可能拼写有误，请对照提示修改！", "error");
        }
    },

    showCodeAnswers() {
        const inputs = document.querySelectorAll("#web-code-box .code-inline-input");
        inputs.forEach(input => {
            input.value = input.dataset.answer;
            input.className = "code-inline-input correct";
        });
        App.showToast("正确标签属性已显示", "可以仔细观察 HTML5 / CSS3 的常见样式属性进行记忆！", "info");
    },

    navigateCode(dir) {
        const count = StudyData.webDesign.codeExercises.length;
        this.currentCodeIndex = (this.currentCodeIndex + dir + count) % count;
        this.loadCodeChallenge();
    },

    // ==========================================
    // 6.2 概念填空
    // ==========================================
    loadConceptChallenge() {
        const ce = StudyData.webDesign.conceptExercises[this.currentConceptIndex];
        
        document.getElementById("web-concept-text").textContent = ce.q;
        document.getElementById("web-concept-input").value = "";
        document.getElementById("web-concept-input").style.borderColor = "var(--border-light)";
        document.getElementById("web-concept-solution").classList.add("hidden");
        document.getElementById("btn-show-web-concept").textContent = "看一眼答案";

        // 隐藏答案按钮
        document.getElementById("btn-show-web-concept").classList.add("hidden");
    },

    verifyConceptAnswer() {
        const ce = StudyData.webDesign.conceptExercises[this.currentConceptIndex];
        const input = document.getElementById("web-concept-input");
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
            return userAns === cleanAns || userAns.replace(/[<>]/g, "") === cleanAns.replace(/[<>]/g, "");
        });

        // 提交即解锁答案按钮
        document.getElementById("btn-show-web-concept").classList.remove("hidden");

        if (isCorrect) {
            input.style.borderColor = "var(--color-emerald)";
            App.showToast("回答正确！", "恭喜您答对了网页制作概念测试题！经验值+15", "success");
            App.awardExp(15, "解答网页制作概念填空题");
            this.showConceptSolutionPanel(true);
            App.completeTask("web-design");
        } else {
            input.style.borderColor = "var(--color-rose)";
            input.style.animation = "shake 0.4s";
            setTimeout(() => input.style.animation = "", 400);
            App.showToast("答案不对哦", "请注意 HTML 标签名称的输入（如: ul 或 ol），或直接“看一眼答案”。", "error");
        }
    },

    showConceptAnswer() {
        const ce = StudyData.webDesign.conceptExercises[this.currentConceptIndex];
        const btn = document.getElementById("btn-show-web-concept");
        
        if (btn.textContent === "看一眼答案") {
            document.getElementById("web-concept-input").value = ce.ans[0];
            this.showConceptSolutionPanel(true);
            btn.textContent = "隐藏答案";
        } else {
            this.showConceptSolutionPanel(false);
            document.getElementById("web-concept-input").value = "";
            btn.textContent = "看一眼答案";
        }
    },

    showConceptSolutionPanel(show) {
        const panel = document.getElementById("web-concept-solution");
        const ce = StudyData.webDesign.conceptExercises[this.currentConceptIndex];
        
        if (show) {
            panel.classList.remove("hidden");
            panel.innerHTML = `
                <div style="font-weight: 600; color: #f97316; margin-bottom: 4px;">参考解析：</div>
                <div>${ce.solution}</div>
            `;
        } else {
            panel.classList.add("hidden");
        }
    },

    navigateConcept(dir) {
        const count = StudyData.webDesign.conceptExercises.length;
        this.currentConceptIndex = (this.currentConceptIndex + dir + count) % count;
        this.loadConceptChallenge();
    }
};

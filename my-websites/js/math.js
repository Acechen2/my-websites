/* ==========================================================================
   LearningHub - 数学空间交互模块 (math.js)
   ========================================================================== */

const MathModule = {
    currentFormulaIndex: 0,
    currentProblemIndex: 0,
    
    // Canvas 草稿纸状态
    canvas: null,
    ctx: null,
    isDrawing: false,
    drawColor: "#00f2fe",
    lineWidth: 5,
    lastX: 0,
    lastY: 0,

    init() {
        this.bindEvents();
        this.loadFormula();
        this.loadProblem();
        this.initScratchpad();
    },

    bindEvents() {
        // 选项卡切换
        const tabs = document.querySelectorAll("#view-math .tab-btn");
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                
                const target = tab.dataset.tab;
                document.querySelectorAll("#view-math .tab-content").forEach(tc => tc.classList.remove("active"));
                document.getElementById(`tab-${target}`).classList.add("active");
            });
        });

        // 公式
        document.getElementById("btn-check-formula").addEventListener("click", () => this.checkFormulaAnswer());
        document.getElementById("btn-show-formula").addEventListener("click", () => this.showFormulaAnswer());
        document.getElementById("btn-next-formula").addEventListener("click", () => this.navigateFormula(1));
        
        // 习题
        document.getElementById("btn-submit-math-ans").addEventListener("click", () => this.checkProblemAnswer());
        document.getElementById("btn-show-math-solution").addEventListener("click", () => this.toggleProblemSolution());
        document.getElementById("btn-next-math-problem").addEventListener("click", () => this.navigateProblem(1));
        
        // 草稿纸工具
        document.getElementById("btn-clear-scratchpad").addEventListener("click", () => this.clearScratchpad());
        document.getElementById("brush-size").addEventListener("change", (e) => {
            this.lineWidth = parseInt(e.target.value);
        });
 
        // 颜色选择器
        const colorDots = document.querySelectorAll(".color-dot");
        colorDots.forEach(dot => {
            dot.addEventListener("click", (e) => {
                colorDots.forEach(d => d.classList.remove("active"));
                e.target.classList.add("active");
                this.drawColor = e.target.dataset.color;
            });
        });
 
        // 快捷希腊字母输入面板（动态附加到公式卡片中）
        this.createMathSymbolHelper();
    },

    // 动态在公式输入框上方创建一个精美的快捷输入面板
    createMathSymbolHelper() {
        const inputArea = document.querySelector(".formula-input-area");
        if (!inputArea) return;

        const helperDiv = document.createElement("div");
        helperDiv.style.cssText = "display: flex; gap: 8px; justify-content: center; margin-bottom: 8px; margin-top: -8px;";
        
        const symbols = ["α", "β", "²", "θ", "π", "sin", "cos"];
        symbols.forEach(sym => {
            const btn = document.createElement("button");
            btn.className = "btn btn-secondary btn-sm";
            btn.style.padding = "4px 10px";
            btn.textContent = sym;
            btn.type = "button";
            btn.addEventListener("click", () => {
                const input = document.getElementById("formula-input");
                input.value += sym;
                input.focus();
            });
            helperDiv.appendChild(btn);
        });

        inputArea.insertBefore(helperDiv, inputArea.firstChild);
    },

    // ==========================================
    // 2.1 数学公式模块
    // ==========================================
    loadFormula() {
        const formula = StudyData.math.formulas[this.currentFormulaIndex];
        document.getElementById("formula-left-display").textContent = `${formula.left} = ?`;
        document.getElementById("formula-input").value = "";
        document.getElementById("formula-tip-box").classList.add("hidden");
        document.getElementById("formula-input").style.borderColor = "var(--border-light)";
        document.getElementById("btn-show-formula").classList.add("hidden");
    },

    checkFormulaAnswer() {
        const formula = StudyData.math.formulas[this.currentFormulaIndex];
        const userAns = document.getElementById("formula-input").value.replace(/\s+/g, "");
        const realAns = formula.right.replace(/\s+/g, "");

        const input = document.getElementById("formula-input");
        const tipBox = document.getElementById("formula-tip-box");

        // 严格非空校验
        if (userAns === "") {
            App.showToast("请先作答", "公式右侧为空，请填写后再提交比对并解锁答案！", "error");
            input.style.borderColor = "var(--color-rose)";
            input.style.animation = "shake 0.4s";
            setTimeout(() => input.style.animation = "", 400);
            return;
        }

        // 智能清洗比对（忽略字母、括号、乘号的细微拼写差异，比如 sinαcosβ 允许不写乘号）
        if (userAns === realAns || userAns.replace(/[\*\(\)]/g, "") === realAns.replace(/[\*\(\)]/g, "")) {
            input.style.borderColor = "var(--color-emerald)";
            tipBox.classList.remove("hidden");
            tipBox.className = "formula-tip";
            tipBox.style.color = "var(--color-emerald)";
            tipBox.innerHTML = `<strong>回答正确！</strong><br>解析提示：${formula.tip}`;
            
            App.awardExp(15, "正确记忆数学公式 " + formula.left);
            App.completeTask("math-formulas");
        } else {
            input.style.borderColor = "var(--color-rose)";
            tipBox.classList.remove("hidden");
            tipBox.className = "formula-tip";
            tipBox.style.color = "var(--color-rose)";
            tipBox.innerHTML = `<strong>公式不一致哦！</strong> 请检查拼写（可用上方快捷按钮输入希腊字母或平方）。`;
        }
        document.getElementById("btn-show-formula").classList.remove("hidden");
    },

    showFormulaAnswer() {
        const formula = StudyData.math.formulas[this.currentFormulaIndex];
        document.getElementById("formula-input").value = formula.right;
        const tipBox = document.getElementById("formula-tip-box");
        tipBox.classList.remove("hidden");
        tipBox.style.color = "var(--color-text-sub)";
        tipBox.innerHTML = `<strong>正确公式原文：</strong><br><code style="font-size: 16px; color: var(--color-cyan);">${formula.right}</code><br>记忆点：${formula.tip}`;
    },

    navigateFormula(dir) {
        const count = StudyData.math.formulas.length;
        this.currentFormulaIndex = (this.currentFormulaIndex + dir + count) % count;
        this.loadFormula();
    },

    // ==========================================
    // 2.2 数学练习题模块
    // ==========================================
    loadProblem() {
        const prob = StudyData.math.problems[this.currentProblemIndex];
        document.getElementById("math-problem-text").textContent = prob.q;
        document.getElementById("math-ans-input").value = "";
        document.getElementById("math-solution-panel").classList.add("hidden");
        document.getElementById("math-ans-input").style.borderColor = "var(--border-light)";
        document.getElementById("btn-show-math-solution").textContent = "查看解析步骤";
        document.getElementById("btn-show-math-solution").classList.add("hidden");
    },

    checkProblemAnswer() {
        const prob = StudyData.math.problems[this.currentProblemIndex];
        const userAns = document.getElementById("math-ans-input").value.trim().toLowerCase();
        
        const input = document.getElementById("math-ans-input");

        // 严格非空校验
        if (userAns === "") {
            App.showToast("请先作答", "答案输入框为空，请填写后再提交比对并解锁解析！", "error");
            input.style.borderColor = "var(--color-rose)";
            input.style.animation = "shake 0.4s";
            setTimeout(() => input.style.animation = "", 400);
            return;
        }

        // 支持多种正确格式分隔匹配，如“x+y-5=0或x-y+1=0”
        const splitAns = prob.ans.toLowerCase().split(/[或,，|]/);
        const isCorrect = splitAns.some(ans => {
            const cleanAns = ans.replace(/\s+/g, "");
            const cleanUser = userAns.replace(/\s+/g, "");
            return cleanUser === cleanAns || cleanUser.includes(cleanAns);
        });

        if (isCorrect) {
            input.style.borderColor = "var(--color-emerald)";
            App.showToast("回答正确！", "恭喜您答对了这道数学大题，经验值+20", "success");
            App.awardExp(20, "解答数学精选题");
            App.completeTask("math-problems");
            this.toggleProblemSolution(true); // 答对后直接展示解析
        } else {
            input.style.borderColor = "var(--color-rose)";
            App.showToast("答案不对哦", "请在右侧草稿纸上重新算一算，或者查看步骤解析！", "error");
        }
        document.getElementById("btn-show-math-solution").classList.remove("hidden");
    },

    toggleProblemSolution(forceShow = false) {
        const panel = document.getElementById("math-solution-panel");
        const btn = document.getElementById("btn-show-math-solution");
        const prob = StudyData.math.problems[this.currentProblemIndex];

        if (panel.classList.contains("hidden") || forceShow) {
            panel.classList.remove("hidden");
            panel.innerHTML = `
                <div style="font-weight: 600; color: var(--color-cyan); margin-bottom: 6px;">标准步骤分析：</div>
                <div style="white-space: pre-wrap; color: var(--color-text-main); font-family: sans-serif; line-height: 1.6;">${prob.solution}</div>
            `;
            btn.textContent = "隐藏解析";
        } else {
            panel.classList.add("hidden");
            btn.textContent = "查看解析步骤";
        }
    },

    navigateProblem(dir) {
        const count = StudyData.math.problems.length;
        this.currentProblemIndex = (this.currentProblemIndex + dir + count) % count;
        this.loadProblem();
    },

    // ==========================================
    // 2.3 电子画板草稿纸
    // ==========================================
    initScratchpad() {
        this.canvas = document.getElementById("scratchpad-canvas");
        this.ctx = this.canvas.getContext("2d");

        // 统一使用 PointerEvents 完美适配鼠标、触摸屏和电容手写笔
        this.canvas.style.touchAction = "none"; // 禁用默认的滑动拉扯

        // 调整 Canvas 内部像素分辨率以契合父容器大小
        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());

        // 监听 Pointer Events
        this.canvas.addEventListener("pointerdown", (e) => {
            this.startDraw(e);
            if (e.pointerType === "touch" || e.pointerType === "pen") {
                this.canvas.style.touchAction = "none";
            }
        });
        this.canvas.addEventListener("pointermove", (e) => {
            this.draw(e);
            if (this.isDrawing && (e.pointerType === "touch" || e.pointerType === "pen")) {
                e.preventDefault();
            }
        });
        this.canvas.addEventListener("pointerup", () => this.stopDraw());
        this.canvas.addEventListener("pointercancel", () => this.stopDraw());
        this.canvas.addEventListener("pointerleave", () => this.stopDraw());
    },

    resizeCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const newWidth = rect.width;
        const newHeight = Math.max(rect.height, 280); // 确保有足够高度

        // 如果宽度和高度没变，直接返回，避免不必要的清屏
        if (this.canvas.width === newWidth && this.canvas.height === newHeight) {
            return;
        }

        // 保存现有笔迹内容（防止软键盘唤起 resize 导致清屏）
        let tempImage = null;
        if (this.canvas.width > 0 && this.canvas.height > 0) {
            try {
                tempImage = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            } catch (e) {
                console.error("Save canvas data failed:", e);
            }
        }

        // 重新设定画布宽高，此时画布内容会被自动清空
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
        
        // 重新设定画笔属性
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";

        // 将原画迹数据精确绘回新画布
        if (tempImage) {
            try {
                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = tempImage.width;
                tempCanvas.height = tempImage.height;
                const tempCtx = tempCanvas.getContext("2d");
                tempCtx.putImageData(tempImage, 0, 0);

                // 将老图的内容精确画回新的 canvas
                this.ctx.drawImage(tempCanvas, 0, 0);
            } catch (e) {
                console.error("Restore canvas data failed:", e);
            }
        }
    },

    startDraw(e) {
        this.isDrawing = true;
        
        // 计算画布相对坐标
        const rect = this.canvas.getBoundingClientRect();
        this.lastX = e.clientX - rect.left;
        this.lastY = e.clientY - rect.top;
    },

    draw(e) {
        if (!this.isDrawing) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        
        this.ctx.strokeStyle = this.drawColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.stroke();

        this.lastX = x;
        this.lastY = y;
    },

    stopDraw() {
        this.isDrawing = false;
    },

    clearScratchpad() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        App.showToast("草稿纸已清空", "您可以重新涂鸦或演算！", "info");
    }
};

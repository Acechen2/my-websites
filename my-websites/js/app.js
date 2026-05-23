/* ==========================================================================
   LearningHub - 全局主控中心逻辑 (app.js)
   ========================================================================== */

const App = {
    // 全局用户状态
    userState: {
        level: 1,
        exp: 0,
        streak: 0,
        totalTime: 0,
        finishedCount: 0,
        lastActiveDate: "",
        tasks: []
    },

    // 科目熟练度进度
    subjectMastery: {
        chinese: 20,
        math: 15,
        english: 35,
        python: 10,
        mysql: 10,
        web: 5,
        net: 15
    },

    init() {
        this.loadState();
        this.bindGlobalEvents();
        this.initThemeParticles();
        this.updateHeaderStatus();
        this.renderQuote();
        this.renderSubjectProgress();
        this.checkAndGenerateDailyTasks();

        // 初始化各个科目子模块
        if (typeof ChineseModule !== "undefined") ChineseModule.init();
        if (typeof MathModule !== "undefined") MathModule.init();
        if (typeof EnglishModule !== "undefined") EnglishModule.init();
        if (typeof PythonModule !== "undefined") PythonModule.init();
        if (typeof MySqlModule !== "undefined") MySqlModule.init();
        if (typeof WebDesignModule !== "undefined") WebDesignModule.init();
        if (typeof NetworkingModule !== "undefined") NetworkingModule.init();

        this.showToast("极客空间已开启", "系统状态同步成功。准备好开始今天的学习了吗？", "info");
    },

    // 绑定侧边导航与公共按钮
    bindGlobalEvents() {
        const navItems = document.querySelectorAll(".nav-item");
        navItems.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                
                const target = item.dataset.target;
                if (!target) return;

                // 移除所有激活状态
                navItems.forEach(i => i.classList.remove("active"));
                item.classList.add("active");

                // 切换对应视图容器
                const sections = document.querySelectorAll(".view-section");
                sections.forEach(sec => sec.classList.remove("active"));
                
                const activeSection = document.getElementById(`view-${target}`);
                if (activeSection) {
                    activeSection.classList.add("active");
                }
                
                // 切换视图时触发微量时长累计和全局重绘
                this.userState.totalTime += Math.floor(Math.random() * 3) + 1;
                this.saveState();
                this.updateStatsDisplay();

                // 针对特定科目的画板重绘适配
                if (target === "math" && typeof MathModule !== "undefined") {
                    setTimeout(() => MathModule.resizeCanvas(), 100);
                }

                // 移动端体验优化：切换科目时自动将主内容区平滑回滚到顶部
                const main = document.querySelector(".main-content");
                if (main) main.scrollTo({ top: 0, behavior: "smooth" });
            });
        });

        // 刷新任务按钮
        document.getElementById("btn-refresh-tasks").addEventListener("click", () => {
            this.generateDailyTasks(true);
            this.showToast("计划已刷新", "已为您智能重新规划了今天的学习卡片！", "success");
        });
    },

    // ==========================================
    // 2. 状态存储与进度、等级系统
    // ==========================================
    loadState() {
        const local = localStorage.getItem("learning_hub_user_state");
        if (local) {
            try {
                this.userState = { ...this.userState, ...JSON.parse(local) };
            } catch (e) {
                console.error("Parse state error", e);
            }
        } else {
            // 首次初始化打卡
            this.userState.streak = 1;
            this.userState.lastActiveDate = new Date().toDateString();
            this.saveState();
        }
        
        // 打卡日期计算 (连续打卡)
        const todayStr = new Date().toDateString();
        if (this.userState.lastActiveDate !== todayStr) {
            const lastActive = new Date(this.userState.lastActiveDate);
            const diffTime = Math.abs(new Date() - lastActive);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                this.userState.streak += 1;
            } else if (diffDays > 1) {
                this.userState.streak = 1; // 断签重置
            }
            this.userState.lastActiveDate = todayStr;
            this.saveState();
        }
    },

    saveState() {
        localStorage.setItem("learning_hub_user_state", JSON.stringify(this.userState));
        localStorage.setItem("learning_hub_mastery", JSON.stringify(this.subjectMastery));
    },

    // 奖励经验值核心函数
    awardExp(amount, reason) {
        this.userState.exp += amount;
        
        const nextExp = this.userState.level * 100;
        let leveledUp = false;
        
        // 升级逻辑
        if (this.userState.exp >= nextExp) {
            this.userState.exp -= nextExp;
            this.userState.level += 1;
            leveledUp = true;
        }

        this.saveState();
        this.updateHeaderStatus();
        this.updateStatsDisplay();

        if (leveledUp) {
            this.showToast("等级飙升！🎉", `恭喜升级到 Lv.${this.userState.level}！极客脑域进一步拓展！`, "level-up");
            this.triggerConfetti(2.5); // 升级燃放彩带！
        } else {
            this.showToast(`获得经验值 +${amount}`, reason, "success");
        }
    },

    // 达成每日任务卡片
    completeTask(taskId) {
        const task = this.userState.tasks.find(t => t.id === taskId);
        if (task && !task.done) {
            task.done = true;
            this.userState.finishedCount += 1;
            this.saveState();
            
            // 重新渲染任务
            this.renderDailyTasks();
            this.updateStatsDisplay();
            
            // 奖励大额经验
            this.awardExp(task.exp, `完成了每日任务：${task.title}`);

            // 检查全通检测
            this.checkAllTasksFinished();
        }
    },

    checkAllTasksFinished() {
        const allDone = this.userState.tasks.every(t => t.done);
        if (allDone && this.userState.tasks.length > 0) {
            setTimeout(() => {
                this.showToast("今日大满贯！🏆", "您已完美达成了今天的所有学习任务！太棒了！", "level-up");
                this.triggerConfetti(4);
            }, 600);
        }
    },

    // ==========================================
    // 3. UI 渲染渲染器
    // ==========================================
    updateHeaderStatus() {
        document.getElementById("streak-days").textContent = this.userState.streak;
        document.getElementById("user-level").textContent = this.userState.level;
        document.getElementById("user-exp").textContent = this.userState.exp;
        
        const nextExp = this.userState.level * 100;
        document.getElementById("next-level-exp").textContent = nextExp;
        
        const percent = Math.min((this.userState.exp / nextExp) * 100, 100);
        document.getElementById("exp-progress-fill").style.width = `${percent}%`;

        this.updateStatsDisplay();
    },

    updateStatsDisplay() {
        document.getElementById("stats-total-time").textContent = this.userState.totalTime;
        document.getElementById("stats-finished-tasks").textContent = this.userState.finishedCount;
        document.getElementById("stats-exp-gained").textContent = (this.userState.level - 1) * 100 + this.userState.exp;
    },

    renderQuote() {
        const randomQuote = StudyData.quotes[Math.floor(Math.random() * StudyData.quotes.length)];
        document.getElementById("daily-quote").textContent = `“${randomQuote.text}”`;
        document.getElementById("daily-quote-author").textContent = randomQuote.author;
    },

    renderSubjectProgress() {
        const container = document.getElementById("subject-progress-list");
        container.innerHTML = "";

        const subjects = [
            { id: "chinese", name: "语文古风", pct: this.subjectMastery.chinese, color: "var(--color-rose)" },
            { id: "math", name: "数学空间", pct: this.subjectMastery.math, color: "var(--color-cyan)" },
            { id: "english", name: "英语驿站", pct: this.subjectMastery.english, color: "var(--color-emerald)" },
            { id: "python", name: "Python编程", pct: this.subjectMastery.python, color: "var(--color-purple)" },
            { id: "mysql", name: "MySQL数据库", pct: this.subjectMastery.mysql, color: "#3b82f6" },
            { id: "web", name: "网页制作", pct: this.subjectMastery.web, color: "#f97316" },
            { id: "net", name: "网络技术", pct: this.subjectMastery.net, color: "#ec4899" }
        ];

        subjects.forEach(sub => {
            const div = document.createElement("div");
            div.className = "sub-prog-item";
            div.innerHTML = `
                <div class="sub-prog-info">
                    <span class="sub-name">${sub.name}</span>
                    <span class="sub-pct">${sub.pct}%</span>
                </div>
                <div class="sub-bar-bg">
                    <div class="sub-bar-fill" style="width: ${sub.pct}%; background: ${sub.color}"></div>
                </div>
            `;
            container.appendChild(div);
        });
    },

    // ==========================================
    // 4. 今日学习清单动态任务分发
    // ==========================================
    checkAndGenerateDailyTasks() {
        const todayStr = new Date().toDateString();
        // 如果存储中没有今天的任务，或者日期已经改变，则生成新任务
        if (this.userState.tasks.length === 0 || this.userState.lastTasksDate !== todayStr) {
            this.generateDailyTasks();
        } else {
            this.renderDailyTasks();
        }
    },

    generateDailyTasks(force = false) {
        const todayStr = new Date().toDateString();
        
        // 智能编排今日 5 个最精美的跨学科每日计划
        const taskPool = [
            { id: "chinese-poetry", title: "背诵并精准默写一首唐诗宋词", subject: "语文", class: "chinese", exp: 20, done: false },
            { id: "chinese-words", title: "记忆 1 组高考虚词/实词用法闪卡", subject: "语文", class: "chinese", exp: 10, done: false },
            { id: "math-formulas", title: "记忆并补全 1 条数学核心公式", subject: "数学", class: "math", exp: 15, done: false },
            { id: "math-problems", title: "做对 1 道高考数学几何函数大题", subject: "数学", class: "math", exp: 20, done: false },
            { id: "english-words", title: "拼写并熟读 5 个 IT 高频专业单词", subject: "英语", class: "english", exp: 15, done: false },
            { id: "english-translation", title: "完成 1 条汉英互译核心句型打卡", subject: "英语", class: "english", exp: 20, done: false },
            { id: "python-code", title: "完成 1 组 Python 代码补全或概念自测", subject: "Python", class: "python", exp: 20, done: false },
            { id: "mysql-sql", title: "完成 1 组 SQL 指令补全或数据库概念填空", subject: "MySQL", class: "mysql", exp: 20, done: false },
            { id: "web-design", title: "完成 1 组网页制作标签补全或概念填空", subject: "网页制作", class: "web", exp: 15, done: false },
            { id: "networking-calc", title: "完成 1 组网络指令补全或网络技术概念填空", subject: "网络技术", class: "net", exp: 20, done: false },
            { id: "networking-quiz", title: "完成 1 组网络原理或分层协议概念填空", subject: "网络技术", class: "net", exp: 15, done: false }
        ];

        // 洗牌算法随机抽选 5 条
        const shuffled = taskPool.sort(() => 0.5 - Math.random());
        const selectedTasks = shuffled.slice(0, 5);

        this.userState.tasks = selectedTasks;
        this.userState.lastTasksDate = todayStr;
        this.saveState();
        this.renderDailyTasks();
    },

    renderDailyTasks() {
        const container = document.getElementById("daily-tasks-list");
        container.innerHTML = "";

        if (this.userState.tasks.length === 0) {
            container.innerHTML = `<div class="terminal-placeholder">今天已经没有任务啦！点击右上角刷新计划。</div>`;
            return;
        }

        this.userState.tasks.forEach(task => {
            const item = document.createElement("div");
            item.className = "task-item";
            item.innerHTML = `
                <div class="task-item-left">
                    <div class="task-checkbox-wrapper">
                        <input type="checkbox" class="task-checkbox" id="chk-${task.id}" ${task.done ? "checked disabled" : ""}>
                        <div class="checkbox-custom">
                            <i class="fa-solid fa-check"></i>
                        </div>
                    </div>
                    <div class="task-info">
                        <span class="task-title">${task.title}</span>
                        <div class="task-meta">
                            <span class="task-subject badge-${task.class}">${task.subject}</span>
                            <span class="task-exp">+${task.exp} EXP</span>
                        </div>
                    </div>
                </div>
                <button class="task-action-btn" title="去完成" onclick="App.jumpToSubject('${task.class}')">
                    <i class="fa-solid fa-circle-arrow-right"></i>
                </button>
            `;
            
            // 监听手动勾选测试
            const checkbox = item.querySelector(".task-checkbox");
            if (checkbox && !task.done) {
                checkbox.addEventListener("change", () => {
                    this.completeTask(task.id);
                });
            }

            container.appendChild(item);
        });
    },

    jumpToSubject(subjectClass) {
        const navMap = {
            chinese: "chinese",
            math: "math",
            english: "english",
            python: "python",
            mysql: "mysql",
            web: "web_design",
            net: "networking"
        };
        const targetNav = navMap[subjectClass];
        if (targetNav) {
            const navBtn = document.querySelector(`.nav-item[data-target="${targetNav}"]`);
            if (navBtn) navBtn.click();
        }
    },

    // ==========================================
    // 5. 极美毛玻璃 Toast 系统
    // ==========================================
    showToast(title, desc, type = "info") {
        const container = document.getElementById("toast-container");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = `toast ${type}`;

        const icons = {
            success: "fa-solid fa-circle-check",
            error: "fa-solid fa-triangle-exclamation",
            info: "fa-solid fa-circle-info",
            "level-up": "fa-solid fa-circle-up"
        };

        const iconColor = {
            success: "var(--color-emerald)",
            error: "var(--color-rose)",
            info: "var(--color-cyan)",
            "level-up": "var(--color-gold)"
        };

        toast.innerHTML = `
            <i class="${icons[type]}" style="color: ${iconColor[type]}"></i>
            <div class="toast-content">
                <span class="toast-title">${title}</span>
                <span class="toast-desc">${desc}</span>
            </div>
        `;

        container.appendChild(toast);

        // 3秒后淡出删除
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(100%)";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    },

    // 燃放喜庆彩花 (confetti 粒子)
    triggerConfetti(durationSec) {
        if (typeof confetti === "function") {
            const end = Date.now() + (durationSec * 1000);
            
            (function frame() {
                confetti({
                    particleCount: 4,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ["#6366f1", "#00f2fe", "#10b981"]
                });
                confetti({
                    particleCount: 4,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ["#a855f7", "#f43f5e", "#f59e0b"]
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    },

    // ==========================================
    // 6. 极客暗黑主题动态粒子背景 (Canvas API)
    // ==========================================
    initThemeParticles() {
        const canvas = document.getElementById("particles-canvas");
        const ctx = canvas.getContext("2d");

        let particles = [];
        const maxParticles = 60;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener("resize", resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.color = ["rgba(99, 102, 241, 0.15)", "rgba(0, 242, 254, 0.15)", "rgba(168, 85, 247, 0.15)"][Math.floor(Math.random() * 3)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
};

// 全局启动
window.addEventListener("DOMContentLoaded", () => App.init());

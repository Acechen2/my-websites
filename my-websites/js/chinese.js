/* ==========================================================================
   LearningHub - 语文阁交互模块 (chinese.js)
   ========================================================================== */

const ChineseModule = {
    currentPoetry: null,
    currentWordIndex: 0,

    init() {
        this.bindEvents();
        this.loadPoetrySelect();
        this.renderWordCard();
    },

    bindEvents() {
        // 选项卡切换
        const tabs = document.querySelectorAll("#view-chinese .tab-btn");
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                
                const target = tab.dataset.tab;
                document.querySelectorAll("#view-chinese .tab-content").forEach(tc => tc.classList.remove("active"));
                document.getElementById(`tab-${target}`).classList.add("active");
            });
        });

        // 诗词
        document.getElementById("btn-start-recite").addEventListener("click", () => this.startPoetryRecitation());
        document.getElementById("btn-submit-poetry").addEventListener("click", () => this.verifyPoetryAnswers());
        document.getElementById("btn-show-poetry-answer").addEventListener("click", () => this.togglePoetryAnswer());
        
        // 字词卡片
        document.getElementById("word-flashcard").addEventListener("click", function() {
            this.classList.toggle("flipped");
        });
        document.getElementById("btn-prev-word").addEventListener("click", () => this.navigateWord(-1));
        document.getElementById("btn-next-word").addEventListener("click", () => this.navigateWord(1));
    },

    // 加载诗词篇目下拉框
    loadPoetrySelect() {
        const select = document.getElementById("poetry-select");
        select.innerHTML = "";
        StudyData.chinese.poetry.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.id;
            opt.textContent = item.title;
            select.appendChild(opt);
        });
    },

    // 开始默写
    startPoetryRecitation() {
        const selectId = document.getElementById("poetry-select").value;
        const poetry = StudyData.chinese.poetry.find(p => p.id === selectId);
        if (!poetry) return;

        this.currentPoetry = poetry;
        const linesBox = document.getElementById("poetry-lines-box");
        linesBox.innerHTML = "";
        
        document.getElementById("recite-title").textContent = poetry.title;
        document.getElementById("recite-author").textContent = `[唐/宋] ${poetry.author}`;
        
        // 渲染每一句，按挖空标记放置 input
        poetry.lines.forEach((line, idx) => {
            const lineDiv = document.createElement("div");
            lineDiv.className = "poetry-line";
            
            // 是否是挖空行
            if (poetry.gaps.includes(idx)) {
                // 判断句子是否带标点，去掉末尾标点方便默写，但显示标点
                const punctuation = line.match(/[，。？！；：]/g);
                const pureText = line.replace(/[，。？！；：]/g, "");
                
                lineDiv.innerHTML = `
                    <input type="text" class="poetry-input" 
                           data-answer="${pureText}" 
                           data-idx="${idx}" 
                           placeholder="请默写此句..." 
                           autocomplete="off">
                    <span>${punctuation ? punctuation.join("") : ""}</span>
                `;
            } else {
                lineDiv.textContent = line;
            }
            
            linesBox.appendChild(lineDiv);
        });

        document.getElementById("poetry-playground").classList.remove("hidden");
        document.getElementById("poetry-result-panel").classList.add("hidden");
        document.getElementById("btn-show-poetry-answer").textContent = "查看原文";
        document.getElementById("btn-show-poetry-answer").classList.add("hidden");
    },

    // 校验答案
    verifyPoetryAnswers() {
        if (!this.currentPoetry) return;

        const inputs = document.querySelectorAll("#poetry-lines-box .poetry-input");
        
        // 严格非空核验：防止空提交骗取答案
        let hasEmpty = false;
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.style.borderColor = "var(--color-rose)";
                input.style.animation = "shake 0.4s";
                setTimeout(() => input.style.animation = "", 400);
                hasEmpty = true;
            }
        });
        if (hasEmpty) {
            App.showToast("请先完成默写", "诗句中尚有挖空，请全部填写完成后再提交比对并解锁答案！", "error");
            return;
        }

        let correctCount = 0;
        let totalCount = inputs.length;
        let resultsHTML = "<h4>详细比对报告：</h4>";

        inputs.forEach(input => {
            const userVal = input.value.trim();
            const realVal = input.dataset.answer;
            
            if (userVal === realVal) {
                input.className = "poetry-input correct";
                correctCount++;
            } else {
                input.className = "poetry-input incorrect";
                // 标记出差异 (简易红绿文字对照)
                resultsHTML += `
                    <div style="margin-top: 8px;">
                        <strong>第 ${parseInt(input.dataset.idx) + 1} 句错情：</strong><br>
                        <span style="color: #94a3b8;">您的答案：</span><span style="color: var(--color-rose); text-decoration: line-through;">${userVal || "（未填写）"}</span><br>
                        <span style="color: #94a3b8;">标准答案：</span><span style="color: var(--color-emerald); font-weight: bold;">${realVal}</span>
                    </div>
                `;
            }
        });

        const score = Math.round((correctCount / totalCount) * 100);
        const resultPanel = document.getElementById("poetry-result-panel");
        resultPanel.classList.remove("hidden");
        
        let scoreHTML = `
            <div class="poetry-result-score">
                <i class="fa-solid fa-square-poll-vertical"></i> 
                默写得分：${score} 分
            </div>
            <div class="poetry-result-details">
                共挖空 ${totalCount} 处，您答对了 ${correctCount} 处。
            </div>
        `;

        if (score === 100) {
            scoreHTML += `<div style="color: var(--color-emerald); margin-top: 8px; font-weight: bold;">太赞了！字词完全正确，完美通关！🎉</div>`;
            // 触发 EXP 奖励
            App.awardExp(30, "完美默写古诗词《" + this.currentPoetry.title + "》");
            App.completeTask("chinese-poetry");
        } else if (score >= 60) {
            scoreHTML += `<div style="color: var(--color-gold); margin-top: 8px; font-weight: bold;">及格啦，继续加油，争取拿下满分！💪</div>`;
            App.awardExp(15, "完成古诗词默写《" + this.currentPoetry.title + "》");
            App.completeTask("chinese-poetry");
        } else {
            scoreHTML += `<div style="color: var(--color-rose); margin-top: 8px;">错别字或漏填较多，可以点击“查看原文”重新记忆哦！📖</div>`;
        }

        resultPanel.innerHTML = scoreHTML + (score < 100 ? `<hr style="margin: 12px 0; border-color: rgba(255,255,255,0.05);">${resultsHTML}` : "");
        document.getElementById("btn-show-poetry-answer").classList.remove("hidden");
    },

    // 切换查看原文
    togglePoetryAnswer() {
        if (!this.currentPoetry) return;
        const btn = document.getElementById("btn-show-poetry-answer");
        const inputs = document.querySelectorAll("#poetry-lines-box .poetry-input");

        if (btn.textContent === "查看原文") {
            inputs.forEach(input => {
                input.value = input.dataset.answer;
                input.className = "poetry-input correct";
            });
            btn.textContent = "隐藏原文";
        } else {
            inputs.forEach(input => {
                input.value = "";
                input.className = "poetry-input";
            });
            btn.textContent = "查看原文";
            document.getElementById("poetry-result-panel").classList.add("hidden");
        }
    },

    // 渲染字词卡片
    renderWordCard() {
        const word = StudyData.chinese.vocabulary[this.currentWordIndex];
        const card = document.getElementById("word-flashcard");
        
        // 翻转回正面再换字，防穿帮
        card.classList.remove("flipped");
        
        setTimeout(() => {
            document.getElementById("word-type").textContent = word.type;
            document.getElementById("word-char").textContent = word.char;
            document.getElementById("word-context").textContent = word.sentence;
            
            document.getElementById("word-meaning-text").innerHTML = word.meaning.replace(/②|③|④/g, "<br>$&");
            document.getElementById("word-grammar-info").textContent = `语境例句常驻脑海，助你高考/职高语文实虚词斩获高分！`;
        }, 150);
    },

    // 词汇导航
    navigateWord(dir) {
        const count = StudyData.chinese.vocabulary.length;
        this.currentWordIndex = (this.currentWordIndex + dir + count) % count;
        this.renderWordCard();
        // 浏览卡片奖励微量经验
        App.awardExp(2, "浏览词语卡片");
        App.completeTask("chinese-words");
    }
};

/* ==========================================================================
   LearningHub - 英语词汇翻译模块 (english.js)
   ========================================================================== */

const EnglishModule = {
    currentWordIndex: 0,
    currentTransIndex: 0,

    init() {
        this.bindEvents();
        this.loadWord();
        this.loadTranslation();
    },

    bindEvents() {
        // 单词
        document.getElementById("btn-speak-word").addEventListener("click", () => this.speakCurrentWord());
        document.getElementById("btn-show-word-meaning").addEventListener("click", () => this.showWordMeaning());
        document.getElementById("btn-next-word-eng").addEventListener("click", () => this.navigateWord(1));
        document.getElementById("btn-check-spelling").addEventListener("click", () => this.checkSpelling());
        
        // 支持回车直接拼写校验
        document.getElementById("english-word-input").addEventListener("keypress", (e) => {
            if (e.key === "Enter") this.checkSpelling();
        });

        // 翻译
        document.getElementById("btn-submit-trans").addEventListener("click", () => this.submitTranslation());
        document.getElementById("btn-show-trans-ref").addEventListener("click", () => this.showTranslationReference());
        document.getElementById("btn-next-trans").addEventListener("click", () => this.navigateTranslation(1));
    },

    // ==========================================
    // 3.1 单词拼写与发音
    // ==========================================
    loadWord() {
        const word = StudyData.english.words[this.currentWordIndex];
        
        // 初始隐藏真实拼写，供默写测试！
        // 界面先显示中文和音标，让用户拼写
        document.getElementById("english-word-spelling").textContent = "?????";
        document.getElementById("english-word-phonetic").textContent = word.phonetic;
        
        const meaningBox = document.getElementById("english-word-meaning");
        meaningBox.classList.remove("visible");
        meaningBox.textContent = word.meaning;

        const valMsg = document.getElementById("word-val-msg");
        valMsg.classList.add("hidden");
        valMsg.innerHTML = "";
        
        document.getElementById("english-word-input").value = "";
        document.getElementById("english-word-input").style.borderColor = "var(--border-light)";
        document.getElementById("btn-show-word-meaning").classList.add("hidden");
        
        // 自动播放朗读（非常酷！）
        setTimeout(() => this.speakCurrentWord(), 400);
    },

    speakCurrentWord() {
        const word = StudyData.english.words[this.currentWordIndex];
        if (!word) return;

        if ("speechSynthesis" in window) {
            // 停止当前所有播放
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(word.word);
            utterance.lang = "en-US"; // 美音
            utterance.rate = 0.85;    // 微慢，听得更清晰
            window.speechSynthesis.speak(utterance);
        } else {
            App.showToast("浏览器限制", "当前浏览器不支持 Speech 发音接口，请更换 Chrome/Edge。", "info");
        }
    },

    showWordMeaning() {
        const meaningBox = document.getElementById("english-word-meaning");
        meaningBox.classList.add("visible");
        
        const word = StudyData.english.words[this.currentWordIndex];
        document.getElementById("english-word-spelling").textContent = word.word;
    },

    checkSpelling() {
        const word = StudyData.english.words[this.currentWordIndex];
        const userInp = document.getElementById("english-word-input").value.trim().toLowerCase();
        
        const valMsg = document.getElementById("word-val-msg");
        const input = document.getElementById("english-word-input");

        // 严格非空校验
        if (userInp === "") {
            App.showToast("请先作答", "拼写框为空，请填入后再检测并解锁释义！", "error");
            input.style.borderColor = "var(--color-rose)";
            input.style.animation = "shake 0.4s";
            setTimeout(() => input.style.animation = "", 400);
            return;
        }

        valMsg.classList.remove("hidden");

        if (userInp === word.word.toLowerCase()) {
            input.style.borderColor = "var(--color-emerald)";
            valMsg.className = "validation-message success";
            valMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> 拼写完美匹配！`;
            
            // 显示词义与完整拼写
            this.showWordMeaning();
            
            App.awardExp(10, "拼写英语单词 " + word.word);
            App.completeTask("english-words");
        } else {
            input.style.borderColor = "var(--color-rose)";
            valMsg.className = "validation-message error";
            valMsg.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> 拼写不符，点击“显示释义”看一眼，或者多听几遍发音！`;
            
            // 触发输入框抖动效果
            input.style.animation = "shake 0.4s";
            setTimeout(() => input.style.animation = "", 400);
        }
        document.getElementById("btn-show-word-meaning").classList.remove("hidden");
    },

    navigateWord(dir) {
        const count = StudyData.english.words.length;
        this.currentWordIndex = (this.currentWordIndex + dir + count) % count;
        this.loadWord();
    },

    // ==========================================
    // 3.2 汉英互译训练
    // ==========================================
    loadTranslation() {
        const trans = StudyData.english.translations[this.currentTransIndex];
        const prompt = document.getElementById("trans-source-sentence");
        
        // 显示翻译题目
        prompt.textContent = trans.source;
        
        // 设置方向标签
        const badge = document.querySelector(".translation-prompt .badge");
        if (trans.type === "E-to-C") {
            badge.textContent = "英译汉";
            badge.className = "badge badge-english";
        } else {
            badge.textContent = "汉译英";
            badge.className = "badge badge-python"; // 紫色作为对比
        }

        document.getElementById("trans-user-input").value = "";
        document.getElementById("trans-feedback-box").classList.add("hidden");
        document.getElementById("btn-show-trans-ref").classList.add("hidden");
    },

    submitTranslation() {
        const trans = StudyData.english.translations[this.currentTransIndex];
        const userVal = document.getElementById("trans-user-input").value.trim();
        const feedbackBox = document.getElementById("trans-feedback-box");
        const textarea = document.getElementById("trans-user-input");

        if (!userVal) {
            App.showToast("请先作答", "翻译输入框为空，请填写译文后再提交并解锁参考译文！", "error");
            textarea.style.borderColor = "var(--color-rose)";
            textarea.style.animation = "shake 0.4s";
            setTimeout(() => textarea.style.animation = "", 400);
            return;
        }
        
        textarea.style.borderColor = "var(--border-light)";

        // 智能关键词提取分析 (如：关键词 matching)
        const keywords = trans.keywords.split(", ").map(k => k.split(" (")[0].toLowerCase());
        const userLower = userVal.toLowerCase();
        let matches = [];
        
        keywords.forEach(kw => {
            if (userLower.includes(kw)) {
                matches.push(kw);
            }
        });

        const matchRatio = matches.length / keywords.length;
        feedbackBox.classList.remove("hidden");

        let scoreHTML = "";
        if (matchRatio === 1) {
            scoreHTML = `<span style="color: var(--color-emerald); font-weight: bold;">卓越译笔！完全捕捉了核心短语！🎉</span>`;
            App.awardExp(20, "提交了一份高水平英语译文");
            App.completeTask("english-translation");
        } else if (matchRatio >= 0.5) {
            scoreHTML = `<span style="color: var(--color-gold); font-weight: bold;">翻译得不错！契合了主要含义！🌟</span>`;
            App.awardExp(12, "完成翻译练习");
            App.completeTask("english-translation");
        } else {
            scoreHTML = `<span style="color: var(--color-text-sub);">译文已记录。可以对照参考译文进行优化和词汇积累！</span>`;
        }

        feedbackBox.innerHTML = `
            <div style="margin-bottom: 8px;">${scoreHTML}</div>
            <div class="trans-ref-title">参考译文：</div>
            <div style="color: #e2e8f0; margin-bottom: 6px;">${trans.ref}</div>
            <div style="font-size: 11px; color: var(--color-text-sub);">
                核心表达检测：捕获 <strong>${matches.length} / ${keywords.length}</strong> （${trans.keywords}）
            </div>
        `;
        document.getElementById("btn-show-trans-ref").classList.remove("hidden");
    },

    showTranslationReference() {
        const trans = StudyData.english.translations[this.currentTransIndex];
        const feedbackBox = document.getElementById("trans-feedback-box");
        
        feedbackBox.classList.remove("hidden");
        feedbackBox.innerHTML = `
            <div class="trans-ref-title">官方参考译文：</div>
            <div style="color: #e2e8f0; font-size: 14px; margin-bottom: 6px;">${trans.ref}</div>
            <div style="font-size: 12px; color: var(--color-text-sub);">
                核心表达建议：${trans.keywords}
            </div>
        `;
    },

    navigateTranslation(dir) {
        const count = StudyData.english.translations.length;
        this.currentTransIndex = (this.currentTransIndex + dir + count) % count;
        this.loadTranslation();
    }
};

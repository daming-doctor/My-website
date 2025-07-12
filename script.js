// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 5%';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '20px 5%';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// 项目卡片动画
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 项目详情弹窗功能
const projectDetail = document.getElementById('project-detail');
const quantReportDetail = document.getElementById('report-detail'); // 量化投资报告
const jobReportDetail = document.getElementById('job-report-detail'); // 深圳市数据分析师岗位报告

const closeBtns = document.querySelectorAll('.close-btn');
const viewDetailBtns = document.querySelectorAll('.view-detail');
const viewReportBtns = document.querySelectorAll('.view-report-btn');

// 项目数据
const projects = {
    1: {
        title: "电商价格监控系统",
        subtitle: "实时监控电商平台价格变动，支持多商品阈值报警与日志管理",
        date: "2025年7月",
        tech: "Python, PyQt5, Selenium, BeautifulSoup, SMTP",
        background: "亚马逊平台商品价格波动频繁，手动监控多个商品价格耗时且低效。本项目旨在开发一个桌面应用，帮助用户实时追踪多个商品价格，当价格低于设定阈值时自动发送邮件提醒，解决用户错失低价购买时机的问题。",
        process: "1. <strong>界面设计：</strong>基于PyQt5构建直观的用户界面，包含商品列表、状态监控、功能按钮和配置区域，支持表格右键菜单快速操作。<br><br>2. <strong>数据采集：</strong>结合Selenium和BeautifulSoup实现亚马逊商品信息爬取，支持动态内容加载和页面解析，提取商品标题、价格等核心信息。<br><br>3. <strong>多线程处理：</strong>使用QThread实现多商品并行监控，避免界面卡顿，每个商品独立线程运行，互不干扰。<br><br>4. <strong>状态管理：</strong>设计完整的状态机（初始化中→待执行→正在执行→完成并提醒/异常停止），清晰展示每个商品的监控状态。<br><br>5. <strong>日志系统：</strong>为每个商品创建独立日志文件，记录价格检查历史、错误信息和状态变化，支持日志查看与清空。",
        analysis: "系统具备以下核心功能：<br><br>- <strong>多商品管理：</strong>支持批量添加ASIN，自动初始化商品信息，显示标题、URL和当前状态<br>- <strong>价格监控：</strong>可自定义监控频率（默认5秒/次），实时更新商品价格状态<br>- <strong>阈值报警：</strong>当价格低于设定阈值时，通过SMTP发送邮件提醒<br>- <strong>代理配置：</strong>支持代理IP设置，解决IP限制问题<br>- <strong>日志管理：</strong>右键菜单快速查看/清除单个商品日志<br>- <strong>状态追踪：</strong>记录成功/失败次数，异常状态自动标记",
        architecture: "<strong>系统架构：</strong>PyQt5界面层 → 多线程监控层 → 数据采集层 → 数据存储层 → 报警服务层<br><br><strong>核心组件：</strong><br>- <strong>界面层：</strong>QWidget、QTableWidget构建用户界面，QMenu实现右键菜单<br>- <strong>线程层：</strong>QThread实现NewTaskThread（初始化）和TaskThread（监控）<br>- <strong>采集层：</strong>Selenium处理动态页面，BeautifulSoup解析HTML<br>- <strong>存储层：</strong>JSON文件存储商品信息，文本文件记录日志<br>- <strong>服务层：</strong>SMTP协议实现邮件报警，支持SSL加密连接",
        results: "- <strong>反爬策略：</strong>实现随机请求间隔、请求头伪装，降低被封禁风险<br>- <strong>用户体验：</strong>表格右键菜单支持快速复制、查看日志等操作，提升效率<br>- <strong>鲁棒性设计：</strong>完善的异常处理机制，网络错误自动重试，确保系统稳定运行<br>- <strong>可扩展性：</strong>模块化设计便于添加新功能，如多平台支持、价格历史图表等",
        lessons: "1. <strong>动态页面解析：</strong>亚马逊部分页面使用JavaScript动态加载，采用Selenium模拟浏览器行为，确保价格数据正确提取。<br><br>2. <strong>多线程同步：</strong>主线程与监控线程通过信号槽机制安全通信，避免UI刷新冲突，确保数据一致性。<br><br>3. <strong>邮件报警稳定性：</strong>实现SMTP配置测试功能，支持SSL/TLS加密连接，确保报警邮件可靠送达。<br><br>4. <strong>代理管理：</strong>支持多个代理IP轮询使用，自动跳过无效代理，提升爬虫抗封锁能力。"
    },
    2: {
        title: "网易云音乐评论爬虫",
        subtitle: "逆向工程网易云音乐API，实现评论数据抓取与导出",
        date: "2025年3月",
        tech: "Python, AES加密, 请求处理, 数据解析, CSV导出",
        background: "网易云音乐对评论数据进行了加密保护，通过分析网页前端加密逻辑，成功模拟加密过程，获取到歌曲的评论数据。该项目解决了网易云音乐API的加密难题，实现了高效的数据采集功能。",
        process: "1. <strong>分析加密参数：</strong>通过浏览器开发者工具分析网易云音乐评论请求，发现参数使用AES加密，并有两个加密密钥。<br><br>2. <strong>模拟加密过程：</strong>使用Python实现加密函数，包括两次AES加密和一次RSA加密（其中RSA加密部分使用了固定参数）。<br><br>3. <strong>构建请求：</strong>使用requests库发送POST请求，携带加密后的参数。<br><br>4. <strong>解析与存储：</strong>解析返回的JSON数据，提取评论内容，并存储到CSV文件中。",
        analysis: "系统具备以下核心功能：<br><br>- 逆向网易云音乐API加密逻辑<br>- 支持多页评论爬取（示例中只爬取第一页）<br>- 自动处理加密参数生成<br>- 将评论内容导出为CSV文件",
        architecture: "<strong>系统架构：</strong>加密参数生成 → API请求构造 → 数据解析 → CSV导出<br><br><strong>核心组件：</strong><br>- AES模块实现加密（CBC模式）<br>- base64进行数据编码<br>- requests库发送HTTP请求<br>- json模块解析响应数据<br>- csv模块存储结果",
        results: "- 成功破解网易云音乐API加密机制<br>- 单次请求可获取20条评论数据<br>- 支持自定义歌曲ID进行数据采集<br>- 导出CSV文件包含完整评论内容",
        lessons: "1. <strong>加密算法实现：</strong>网易云音乐使用两次加密，且第二次加密的密钥是随机生成的，但通过分析前端代码发现，第二个密钥实际上是固定的。<br><br>2. <strong>数据格式处理：</strong>需要精确处理AES加密的填充问题，确保与官方加密结果一致。<br><br>3. <strong>请求头设置：</strong>必须设置正确的User-Agent和Referer，否则会被服务器拒绝。<br><br>4. <strong>错误处理：</strong>实现完善的异常处理机制，应对网络波动和服务器限制。"
    },
    3: {
        title: "招聘市场数据分析系统",
        subtitle: "BOSS直聘数据分析师岗位数据爬取与分析",
        date: "2024年12月 - 2025年1月",
        tech: "Python, DrissionPage, Pandas, Matplotlib, WordCloud",
        background: "为深入了解深圳市数据分析师岗位市场情况，本项目爬取BOSS直聘网站上的数据分析师岗位数据，共获取301条有效数据。通过多维度分析，揭示深圳各区域岗位分布、薪资水平及技能要求趋势。",
        process: "1. <strong>数据采集：</strong>使用DrissionPage库模拟浏览器行为，爬取BOSS直聘网站10页数据，共301条记录。<br><br>2. <strong>数据清洗：</strong>处理公司规模、薪资等字段的异常值和缺失值，统一数据格式。<br><br>3. <strong>区域分析：</strong>使用Pandas统计各区岗位数量，Matplotlib绘制地区分布饼图。<br><br>4. <strong>薪资分析：</strong>对薪资数据进行分组，绘制薪资分布直方图。<br><br>5. <strong>技能分析：</strong>提取技能要求关键词，使用WordCloud生成词云图。",
        analysis: "核心分析维度：<br><br>- <strong>区域分布：</strong>南山区(44.9%)、福田区(18.5%)、龙岗区(15.1%)<br>- <strong>薪资分布：</strong>10,000-12,000元区间岗位最多(28个)<br>- <strong>技能要求：</strong>统计学、数据分析、SQL、Python、BI工具<br>- <strong>行业需求：</strong>零售、电商和金融行业需求最高",
        architecture: "<strong>系统架构：</strong>数据采集层 → 数据清洗层 → 分析引擎层 → 可视化层<br><br><strong>核心组件：</strong><br>- DrissionPage实现浏览器自动化<br>- Pandas进行数据清洗和分析<br>- Matplotlib生成饼图和直方图<br>- WordCloud创建技能词云<br>- Excel导出清洗后的数据集",
        results: "- 成功爬取301条有效岗位数据<br>- 揭示深圳数据分析师岗位区域集中现象<br>- 发现薪资分布呈金字塔结构<br>- 识别市场核心技能需求<br>- 为求职者提供市场洞察和职业规划参考",
        lessons: "1. <strong>反爬策略：</strong>BOSS直聘有严格的反爬机制，通过设置合理的请求间隔和模拟真实用户行为成功绕过。<br><br>2. <strong>数据清洗：</strong>公司规模字段存在多种格式(如'100-499人'、'1000-9999人')，需统一处理才能进行有效分析。<br><br>3. <strong>薪资处理：</strong>薪资字段包含范围值(如'15-20K')，需转换为中值或区间进行分析。<br><br>4. <strong>可视化优化：</strong>饼图标签重叠问题通过调整标签位置和添加引导线解决。"
    },
    4: {
        title: "消费板块量化投资策略研究",
        subtitle: "基于中证消费50指数的多因子模型优化方案",
        date: "2025年6月",
        tech: "Python, 蒙特卡罗模拟, 稳健统计, 多因子模型, Pandas",
        background: "针对中证消费50指数多因子建模中的离群值处理和中性化技术选择难题，本项目通过蒙特卡罗模拟方法构建评估框架，定量分析不同预处理技术在消费数据场景下的性能表现。",
        process: "1. <strong>数据生成：</strong>构建符合消费板块特征（尖峰厚尾、行业聚集）的合成数据集，植入可控离群值。<br><br>2. <strong>离群值处理：</strong>实现MAD法、Huber M估计、Winsorize三种离群值处理技术。<br><br>3. <strong>中性化处理：</strong>实现线性回归法和矩阵分解正交化两种中性化技术。<br><br>4. <strong>蒙特卡罗模拟：</strong>设计1000次模拟实验，评估不同组合在因子稳定性、IC值、信息比率等指标的表现。<br><br>5. <strong>结果分析：</strong>基于模拟结果，构建最优预处理方案并验证实盘效果。",
        analysis: "核心分析发现：<br><br>- MAD法在因子稳定性方面显著占优（IC标准差平均降低18.3%）<br>- 线性回归法展现更佳风险剥离能力（多空组合夏普比率提升171%）<br>- \"MAD+线性回归\"组合使因子IC波动率降低22.6%<br>- 优化方案使分层收益反转频率下降41%",
        architecture: "<strong>系统架构：</strong>数据生成层 → 预处理层（离群处理+中性化）→ 因子检验层 → 性能评估层<br><br><strong>核心组件：</strong><br>- NumPy生成合成数据集<br>- Statsmodels实现稳健统计方法<br>- Scikit-learn实现矩阵分解<br>- Pandas处理模拟结果数据<br>- Matplotlib可视化评估指标",
        results: "- 建立消费数据专用预处理评估框架<br>- 识别最优离群值处理技术（MAD法）<br>- 确定最佳中性化方法（线性回归法）<br>- 优化方案使策略年化收益率提升至18.6%<br>- 最大回撤控制在15.3%以内",
        lessons: "1. <strong>数据特征适配：</strong>消费数据具有明显行业聚集特征，标准正态分布假设不成立，需定制数据生成方法。<br><br>2. <strong>算法选择：</strong>Huber M估计理论优势明显，但在消费数据场景下表现不如MAD法稳定。<br><br>3. <strong>计算效率：</strong>蒙特卡罗模拟计算量大，通过并行计算将运行时间从8小时缩短至45分钟。<br><br>4. <strong>实盘验证：</strong>预处理优化方案在2024Q1实盘测试中，IC值稳定性提升19.8%，验证模拟结果有效性。"
    }
};

// 报告数据
const reports = {
    1: {
        title: "深圳市数据分析师岗位分析报告",
        subtitle: "基于BOSS直聘网站301条数据分析师岗位数据的深度分析",
        date: "2025年1月"
    },
    2: {
        title: "量化投资预处理方案分析报告",
        subtitle: "基于中证消费50指数的多因子模型优化研究",
        date: "2025年6月"
    }
};

// 打开项目详情弹窗
viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        loadProjectDetails(projects[projectId]);
        projectDetail.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// 打开报告详情弹窗
viewReportBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const reportId = this.getAttribute('data-report');

        // 根据报告ID决定打开哪个弹窗
        if (reportId === "1") {
            // 打开深圳市数据分析师岗位报告弹窗
            jobReportDetail.classList.add('active');
        } else if (reportId === "2") {
            // 打开量化投资报告弹窗
            loadReportDetails(reports[reportId]);
            quantReportDetail.classList.add('active');
        }

        document.body.style.overflow = 'hidden';
    });
});

// 关闭弹窗 - 分别处理每个弹窗
closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 找到最近的弹窗容器
        const modal = this.closest('.project-detail, .report-detail');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// 点击弹窗外部关闭
projectDetail.addEventListener('click', function(e) {
    if (e.target === projectDetail) {
        projectDetail.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

quantReportDetail.addEventListener('click', function(e) {
    if (e.target === quantReportDetail) {
        quantReportDetail.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

jobReportDetail.addEventListener('click', function(e) {
    if (e.target === jobReportDetail) {
        jobReportDetail.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// 加载项目详情数据
function loadProjectDetails(project) {
    document.getElementById('detail-title').textContent = project.title;
    document.getElementById('detail-subtitle').textContent = project.subtitle;
    document.getElementById('detail-date').textContent = project.date;
    document.getElementById('detail-tech').textContent = project.tech;
    document.getElementById('detail-background').innerHTML = project.background;
    document.getElementById('detail-process').innerHTML = project.process;
    document.getElementById('detail-analysis').innerHTML = project.analysis;
    document.getElementById('detail-architecture').innerHTML = project.architecture;
    document.getElementById('detail-results').innerHTML = project.results;
    document.getElementById('detail-lessons').innerHTML = project.lessons;
}

// 加载报告详情数据
function loadReportDetails(report) {
    document.getElementById('report-title').textContent = report.title;
    document.getElementById('report-subtitle').textContent = report.subtitle;
    document.getElementById('report-date').textContent = report.date;
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").then(() => {
    console.log("SW 注册");
  });
}

// 推送消息
const handleMessage = () => {
  new Notification("这是一条测试通知消息", {
    body: "锅巴🌶，喷火！🔥",
    icon: "assets/guoba.jpeg",
  });
};

// 用户授权
const handleAuth = () => {
  Notification.requestPermission().then((value) => {
    if (value !== "granted") {
      alert("请授权！");
      return;
    }
    handleMessage();
  });
};

const addBtn = document.getElementById("desktop");

window.addEventListener("beforeinstallprompt", (e) => {
  // 防止 Chrome 67 及更早版本自动显示安装提示
  e.preventDefault();
  // 稍后再触发此事件
  deferredPrompt = e;
  // 更新 UI 以提醒用户可以将 App 安装到桌面
  addBtn.style.display = "block";

  addBtn.addEventListener("click", () => {
    // 隐藏显示 A2HS 按钮的界面
    addBtn.style.display = "none";
    // 显示安装提示
    deferredPrompt.prompt();
    // 等待用户反馈
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("用户同意添加");
      } else {
        console.log("用户拒绝添加");
      }
      deferredPrompt = null;
    });
  });
});

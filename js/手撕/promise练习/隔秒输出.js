const tasks = []; // 这里存放异步操作的 Promise
const output = (i) => new Promise((resolve) => {
  setTimeout(() => {
    console.log(new Date, i);
    resolve();
  }, 1000 * i);
});

// 生成全部的异步操作
for (var i = 0; i < 5; i++) {
  tasks.push(output(i));
}

// 异步操作完成之后，输出最后的 i
Promise.all(tasks).then(() => {
  setTimeout(() => {
    console.log(new Date, i);
  }, 1000);
});

// =============================================sleep

// 模拟其他语言中的 sleep，实际上可以是任何异步操作
const sleep = (timeountMS) => new Promise((resolve) => {
  setTimeout(resolve, timeountMS);
});

(async () => {  // 声明即执行的 async 函数表达式
  for (var i = 0; i < 5; i++) {
    if (i > 0) {
      await sleep(1000);
    }
    console.log(new Date, i);
  }

  await sleep(1000);
  console.log(new Date, i);
})();

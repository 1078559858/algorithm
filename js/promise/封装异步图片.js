// 这个相对简单一些，只需要在图片的onload函数中，使用resolve返回一下就可以了。
//https://mp.weixin.qq.com/s?__biz=MzU3OTg0Njc0MA==&mid=2247483869&idx=1&sn=3a467476c8b8be023659636b8dded7d6&chksm=fd5e96e6ca291ff0b3f0f3d7768ccafa754e5bf8f723e309d9971b6242ee0752fafeab7437c9&mpshare=1&scene=1&srcid=1020CCy9nZJpin4C3trt2jo2&sharer_sharetime=1603133835359&sharer_shareid=bad323dd2184d8c4c05bdb3ef8fafd34&key=f3ad4f79e700da4e338a041b22c63282621969e28e5afc9efd1c365e7f3fd9c3b4bfb5a0b3ec291484bd6b77adbe69d7b1e37f9f1a44782720ae1595f0507e0942e682d3c065b32990b3e1eaf4fb8b91eccb901ae313dea028be2b888b93cf1b047b3f445abe66519a331bbe8c2cf95c408860a03d8ee0ab9a48b35d5eae6a9a&ascene=1&uin=MTY3MTYxOTg2Mg%3D%3D&devicetype=Windows+10+x64&version=6300002f&lang=zh_CN&exportkey=AR%2FTsPVfefjyg4NI3fdJGQg%3D&pass_ticket=yqavzN211WPqcwuAyMK4oFpabv4Uec2xd5aGDsDujxSq6rOzM%2Bky2r%2FVvBqDfN6r&wx_header=0

var urls = [
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png",
];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      reject(newError('Could not load image at' + url));
    };
    img.src = url;
    document.body.appendChild(img)
  })
}

function limitLoad(urls, handler, limit) {
  let sequence = [].concat(urls);
  let promises = sequence.splice(0, limit).map((url, idx) => {
    return handler(url).then(() => {
      return idx;
    })
  })


  return sequence.reduce((pCollect, url) => {
    return pCollect.then(() => {
      return Promise.race(promises);
    }).then(fastestIndex => {
      promises[fastestIndex] = handler(url).then(() => {
        return fastestIndex;
      })
    }).catch(err => {
      console.log(err)
    })
  }, Promise.resolve()).then(() => {
    return Promise.all(promises)
  })
}

function limitLoad(arr, handler, limit) {
  let promises = [].concat(arr);
  let sequence = promises.slice(0, limit).map((value, idx) => {
    return handler(value).then(() => idx)
  })

  return promises.reduce((total, cur) => {
    return total.then(Promise.race(sequence))
      .then(idx => t[idx] = handler(cur).then(() => idx))
      .catch(error => Promise.reject(error))
  }, Promise.resolve()).then(() => {
    return Promise.all(res)
  })
}
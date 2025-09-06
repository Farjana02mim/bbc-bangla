/**
 * 1. api - fetch()
 * 2. forEach
 * 3. map
 * 4. join()
 * 5. push()
 * 6. filter()
 * 7. find()
 */

// const data = [
//   {
//     title:
//       "'হুট করে একদিন চাকরি নাই, দুই-তিন মাস বাড়িতে বসে থাকা তো মানসিকভাবে বিরাট আঘাত'",
//     id: "c3r4r51n9lno",
//     createdAt: "2025-09-04T12:43:26.632Z",
//   },
//   {
//     title:
//       "ইউক্রেন চুক্তি না মানলে লক্ষ্য পূরণে সামরিক ব্যবস্থা নেবে রাশিয়া, চীন থেকে পুতিনের হুমকি",
//     id: "c0kn4z3rnj1o",
//     createdAt: "2025-09-04T12:43:28.080Z",
//   },
//   {
//     title: "ভারত-চীন সম্পর্কে নতুন মোড় কী বার্তা দিচ্ছে পাকিস্তানকে",
//     id: "cwy3yy82gpko",
//     createdAt: "2025-09-04T12:43:29.756Z",
//   },
//   {
//     title:
//       "বাংলাদেশ-পাকিস্তানে 'ধর্মীয় নিপীড়নের' শিকার সংখ্যালঘুদের ভারতের নতুন আইনে ছাড়",
//     id: "cderyyz38p9o",
//     createdAt: "2025-09-04T12:43:30.288Z",
//   },
//   {
//     title:
//       "প্রশাসনে লটারির মাধ্যমে পোস্টিং নয়, পুলিশে যুক্ত হচ্ছেন চার হাজার নতুন এএসআই",
//     id: "c2l7lly50rwt",
//     createdAt: "2025-09-04T12:43:32.136Z",
//   },
//   {
//     title: "মার্কিন নেতৃত্বাধীন বিশ্বব্যবস্থার বিরুদ্ধে চীনের জোরালো বার্তা",
//     id: "c4gve3nxd24o",
//     createdAt: "2025-09-04T12:43:32.734Z",
//   },
//   {
//     title:
//       "বাবাকে নজরবন্দি, ভাইদের আটক - সৌদি রাজতন্ত্রে যেভাবে ক্ষমতাধর হয়ে ওঠেন মোহাম্মদ বিন সালমান",
//     id: "c1mpmx9dvrgo",
//     createdAt: "2025-09-04T12:43:33.246Z",
//   },
// ];

//  for(let i=0; i<data.length; i++) data[i]

// for(let d of data) {
//     console.log(d)
// }

// data.forEach(d => {
//     console.log(d)
// })
// forEach kono kichu return kore na (undefined return kore)

//map
// const titleArr = data.map(d => `<span>${d.title}</span>`)

// map new array return kore dey

// console.log(titleArr)

// const arr = ['hello', 'hi', 'abcd']
// console.log(arr.join("-"))

//push -> array er sheshe element add kore 

// data.push(10)
// data.push(20)
// data.push({
//     title: 'this is a title'
// })
// console.log(data)

// const arr = [1, 2, 3, 3, 3, 4, 5, 6, 7]

// const filteredArray = arr.filter(num => num !== 3)
// [1, 2, 4, 5, 6, 7]
// new array 
// console.log(filteredArray)

// const filteredData = data.filter(d => d.id !== 'c3r4r51n9lno')
// console.log(filteredData)

// const foundData = data.find(d => d.id === 'c1mpmx9dvrgo')
// one element return kore 
// undefined -- falsy --- false 
// console.log(foundData)

// if(foundData) {
//     console.log("Paaoa geche...")
// } else {
//     console.log("Paoa jayni...")
// }

// const arr = ['hello', 'hi', 'dhjdgh']
// let container = ""

// arr.forEach(a => {
//   container =  container + `<span>${a}</span>`;
// })

// console.log(container)

// load catergories 

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displaCategories(data.categories))
    .catch(err=> console.log(err))
}


// load video api 
const loadVideo = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos?title=')
    .then(res => res.json())
    .then(data => displayVideo(data.videos))
    .catch(err=> console.log(err))
}

const loadDetails = async (videoId) => {
    console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video);
  };
  const displayDetails = (video) => {
    console.log(video);
    const detailContainer = document.getElementById("modal-content");
  
    detailContainer.innerHTML = `
     <img src=${video.thumbnail} />
     <p>${video.description}</p>
    `;
  
    // way-1
    // document.getElementById("showModalData").click();
    //way-2
    document.getElementById("customModal").showModal();
  };

// {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }

function getTimeString(time) {
    const year = parseInt(time / (3600 * 24 * 365)); 
    time = time % (3600 * 24 * 365);

    const month = parseInt(time / (3600 * 24 * 30)); 
    time = time % (3600 * 24 * 30);

    if (year || month) {
        // Return only year and month if either is present
        return `${year ? year + " year " : ""}${month ? month + " month " : ""} ago`;
    }
    const day = parseInt(time / (3600 * 24)); // 1 day = 24 hours
    time = time % (3600 * 24);

    const hour = parseInt(time / 3600); 
    let remainingSecond = time % 3600;

    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;

    // Return days, hours, and minutes only if there are no years or months
    return `${day ? day + " day " : ""}${hour ? hour + " hour " : ""}${minute ? minute + " minute " : ""} ago`;
}





// show video item from video api function 
const displayVideo =(videos)=>{
    const videoContainer =document.getElementById('video')
    videoContainer.innerHTML=``
    if (videos.length == 0) {
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        
          <img src="assets/Icon.png" /> 
          <h2 class="text-center text-xl font-bold"> No Content Here in this Categery </h2> 
        </div>`;
      } else {
        videoContainer.classList.add("grid");
      }
    videos.forEach(item => {

        console.log(item)

    const div =document.createElement('div')
    div.classList ='card  glass'
    div.innerHTML=`
    <figure class="h-[230px] relative">
        <img loading="lazy" 
        src=${item.thumbnail}
        alt="Shoes"
        class="rounded-xl h-full w-full object-cover    " />
        ${
            item.others.posted_date?.length === 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black text-gray-50 text-sm rounded-lg px-1 ">${getTimeString(item.others.posted_date)} </span>`
        }
        
    </figure>
    <div class="px-2 py-2 flex gap-3">
        <div>
            <img class="h-10 w-10 object-cover rounded-full" src=${item.authors[0].profile_picture} />
        </div>
        <div>
            <h2 class="font-bold text-lg">${item.title}</h2>
            <div class="flex items-center gap-2 ">
            <p class="text-gray-400 text-sm ">${item.authors[0].profile_name}</p>

            ${item.authors[0].verified === true ? ` <img  class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" />` : ""}
          
        </div>
        <p> <button  onclick="loadDetails('${
          item.video_id
        }')" class="btn btn-sm btn-info ">details</button> </p>
        </div>
    </div>
    `;
    videoContainer.append(div)
    })
}


function catagorySelect(id){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => displayVideo(data.category))
    .catch(err=> console.log(err))
    const btn = document.getElementById(`btn-${id}`)
    if(btn){
        const allButtons = document.querySelectorAll('.btn-success');
        allButtons.forEach(button => button.classList.remove('btn-success'));
        btn.classList.add('btn-success')
    }
}


// catagory display button show from api fetch 
const displaCategories = (categories) => {
    const navBtn = document.getElementById('navBtn')
    categories.forEach(item => {
        // console.log(item)

    const btn =document.createElement('div')
    btn.innerHTML=`
    <button id="btn-${item.category_id}" class="btn" onclick="catagorySelect(${item.category_id})" >${item.category}</button>
    `
    
    navBtn.append(btn)

    })
}

loadCategories()
loadVideo()
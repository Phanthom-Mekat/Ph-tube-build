
// load catergories 

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displaCategories(data.categories))
    .catch(err=> console.log(err))
}

const displaCategories = (categories) => {
    const navBtn = document.getElementById('navBtn')
    categories.forEach(item => {
        // console.log(item)

    const btn =document.createElement('button')
    btn.classList = 'btn'
    btn.innerText = item.category

    navBtn.append(btn)

    })
}

loadCategories()

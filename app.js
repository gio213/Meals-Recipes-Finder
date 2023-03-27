//APIs/

const url = "https://www.themealdb.com/api/json/v1/1/random.php";
const urlSearch = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const urlCategory = "www.themealdb.com/api/json/v1/1/categories.php";

//DOMs/
const container = document.getElementById("container");
const secondContainer = document.getElementById("secondContainer");
secondContainer.style.display = "none";
const searchInput = document.querySelector("input");
const button = document.getElementById("button");
const categoryElement = document.getElementById("category");

let temp = [];

const rendrerData = async (data) => {
  const box = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("h3");

  box.setAttribute("class", "box");
  const meal = data;
  title.innerHTML = meal.strMeal;

  img.style.border = "2px solid black";
  img.src = meal.strMealThumb;
  img.alt = meal.strMeal;
  img.data = meal;

  box.appendChild(img);

  box.appendChild(title);
  container.appendChild(box);
};

async function getMeal() {
  for (let i = 0; i < 8; i++) {
    const response = await fetch(url);
    const data = await response.json();
    temp.push(data);

    rendrerData(data.meals[0]);
  }
  container.childNodes.forEach((box) => {
    box.addEventListener("click", (e) => {
      container.style.display = "none";
      secondContainer.style.display = "flex";
      secondContainer.setAttribute("class", "secondContainer");

      const data = e.target.data;

      const mealImg = e.target.src;

      const mealImgDiv = document.createElement("div");
      mealImgDiv.setAttribute("class", "mealImgDiv");
      const mealImgTag = document.createElement("img");
      mealImgDiv.appendChild(mealImgTag);
      mealImgTag.src = mealImg;
      secondContainer.appendChild(mealImgDiv);

      const mealTitleDiv = document.createElement("div");
      mealTitleDiv.setAttribute("class", "mealTitleDiv");
      const mealTitle = document.createElement("h1");
      mealTitle.innerHTML = data.strMeal;
      mealTitleDiv.appendChild(mealTitle);
      secondContainer.appendChild(mealTitleDiv);
      const insturctionDiv = document.createElement("div");
      insturctionDiv.setAttribute("class", "insturctionDiv");
      const insturction = document.createElement("p");
      insturction.innerHTML = data.strInstructions;
      insturctionDiv.appendChild(insturction);
      secondContainer.appendChild(insturctionDiv);
      const titleAndInsturctionDiv = document.createElement("div");
      titleAndInsturctionDiv.setAttribute("class", "titleAndInsturctionDiv");
      titleAndInsturctionDiv.appendChild(mealTitleDiv);
      titleAndInsturctionDiv.appendChild(insturctionDiv);
      secondContainer.appendChild(titleAndInsturctionDiv);
      const infoDiv = document.createElement("div");
      infoDiv.setAttribute("class", "infoDiv");
      const info = document.createElement("ul");
      info.innerHTML = `
      <li>Area: ${data.strArea}</li>
      <li>Category: ${data.strCategory}</li>
      <li>Tags: ${data.strTags}</li>
      `;
      if (data.strTags === null) {
        info.innerHTML = ` 
          <li>Area: ${data.strArea}</li>
          <li>Category: ${data.strCategory}</li>
          <li>Tags: No tags</li>
        `;
      }

      infoDiv.appendChild(info);
      mealImgDiv.appendChild(infoDiv);
      const ingredientsTitle = document.createElement("h2");
      ingredientsTitle.innerHTML = "Ingredients:";
      ingredientsTitle.setAttribute("class", "ingredientsTitle");
      mealImgDiv.appendChild(ingredientsTitle);

      const ingredientsDiv = document.createElement("div");
      ingredientsDiv.setAttribute("class", "ingredientsDiv");
      const ingredients = document.createElement("ul");
      ingredientsDiv.appendChild(ingredients);
      mealImgDiv.appendChild(ingredientsDiv);

      for (let i = 1; i < 20; i++) {
        if (data[`strIngredient${i}`] !== "") {
          const ingredient = document.createElement("li");
          ingredient.innerHTML = `${data[`strIngredient${i}`]} - ${
            data[`strMeasure${i}`]
          }`;
          ingredients.appendChild(ingredient);
        }
      }

      const youtubeIfame = document.createElement("iframe");
      youtubeIfame.setAttribute("class", "youtubeIfame");
      youtubeIfame.src = `https://www.youtube.com/embed/${data.strYoutube.slice(
        -11
      )}`;
      if (data.strYoutube === null) {
        youtubeIfame.style.display = "none";
      }

      titleAndInsturctionDiv.appendChild(youtubeIfame);
    });
  });
}

getMeal();

button.addEventListener("click", () => {
  container.innerHTML = "";
  searchInput.value = "";
  categoryElement[0].selected = true;
  getMeal();
  if (secondContainer.style.display === "flex") {
    secondContainer.style.display = "flex";
    secondContainer.innerHTML = "";
    container.style.display = "flex";

    secondContainer.style.display = "none";
    searchInput.value = "";
  }
});

searchInput.addEventListener("keyup", (e) => {
  const searchValue = e.target.value;

  async function getSearchedMeal() {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
    );
    const data = await response.json();
    const meal = data.meals[0];

    if (searchValue.length > 0) {
      container.innerHTML = "";

      const box = document.createElement("div");
      box.setAttribute("class", "box");

      const title = document.createElement("h3");

      title.innerHTML = meal.strMeal;
      img = document.createElement("img");
      img.style.border = "2px solid black";
      img.src = meal.strMealThumb;
      img.alt = meal.strMeal;
      img.data = meal;

      box.appendChild(img);

      box.appendChild(title);
      container.appendChild(box);
      container.childNodes.forEach((box) => {
        box.addEventListener("click", (e) => {
          container.style.display = "none";
          secondContainer.style.display = "flex";
          secondContainer.setAttribute("class", "secondContainer");

          const data = e.target.data;

          const mealImg = e.target.src;

          const mealImgDiv = document.createElement("div");
          mealImgDiv.setAttribute("class", "mealImgDiv");
          const mealImgTag = document.createElement("img");
          mealImgDiv.appendChild(mealImgTag);
          mealImgTag.src = mealImg;
          secondContainer.appendChild(mealImgDiv);

          const mealTitleDiv = document.createElement("div");
          mealTitleDiv.setAttribute("class", "mealTitleDiv");
          const mealTitle = document.createElement("h1");
          mealTitle.innerHTML = data.strMeal;
          mealTitleDiv.appendChild(mealTitle);
          secondContainer.appendChild(mealTitleDiv);
          const insturctionDiv = document.createElement("div");
          insturctionDiv.setAttribute("class", "insturctionDiv");
          const insturction = document.createElement("p");
          insturction.innerHTML = data.strInstructions;
          insturctionDiv.appendChild(insturction);
          secondContainer.appendChild(insturctionDiv);
          const titleAndInsturctionDiv = document.createElement("div");
          titleAndInsturctionDiv.setAttribute(
            "class",
            "titleAndInsturctionDiv"
          );
          titleAndInsturctionDiv.appendChild(mealTitleDiv);
          titleAndInsturctionDiv.appendChild(insturctionDiv);
          secondContainer.appendChild(titleAndInsturctionDiv);
          const infoDiv = document.createElement("div");
          infoDiv.setAttribute("class", "infoDiv");
          const info = document.createElement("ul");
          info.innerHTML = `
          <li>Area: ${data.strArea}</li>
          <li>Category: ${data.strCategory}</li>
          <li>Tags: ${data.strTags}</li>
          `;
          if (data.strTags === null) {
            info.innerHTML = `
              <li>Area: ${data.strArea}</li>
              <li>Category: ${data.strCategory}</li>
              <li>Tags: No tags</li>
            `;
          }

          infoDiv.appendChild(info);
          mealImgDiv.appendChild(infoDiv);
          const ingredientsTitle = document.createElement("h2");
          ingredientsTitle.innerHTML = "Ingredients:";
          ingredientsTitle.setAttribute("class", "ingredientsTitle");
          mealImgDiv.appendChild(ingredientsTitle);

          const ingredientsDiv = document.createElement("div");
          ingredientsDiv.setAttribute("class", "ingredientsDiv");
          const ingredients = document.createElement("ul");
          ingredientsDiv.appendChild(ingredients);
          mealImgDiv.appendChild(ingredientsDiv);

          for (let i = 1; i < 20; i++) {
            if (data[`strIngredient${i}`] !== "") {
              const ingredient = document.createElement("li");
              ingredient.innerHTML = `${data[`strIngredient${i}`]} - ${
                data[`strMeasure${i}`]
              }`;
              ingredients.appendChild(ingredient);
            }
          }

          const youtubeIfame = document.createElement("iframe");
          youtubeIfame.setAttribute("class", "youtubeIfame");
          youtubeIfame.src = `https://www.youtube.com/embed/${data.strYoutube.slice(
            -11
          )}`;
          if (data.strYoutube === null) {
            youtubeIfame.style.display = "none";
          }

          titleAndInsturctionDiv.appendChild(youtubeIfame);
        });
      });
    } else {
      container.innerHTML = "";
      getMeal();
    }
  }
  getSearchedMeal();
});

let selectedCategory;
const select = document.getElementById("category");

async function getMealByCategory() {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => response.json())
    .then((data) => {
      const categories = data.categories;
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.strCategory;
        option.innerHTML = category.strCategory;
        select.appendChild(option);
      });
    });

  select.addEventListener("change", (e) => {
    selectedCategory = e.target.value;
    const filteredData = `https://www.themealdb.com/api/json/v1/1/search.php?s=${selectedCategory}`;
    if (
      selectedCategory === "Dessert" ||
      selectedCategory === "Miscellaneous" ||
      selectedCategory === "Side" ||
      selectedCategory === "Starter" ||
      selectedCategory === "Pasta"
    ) {
      container.innerHTML = `<h1>Sorry, we don't have any ${selectedCategory} recipe</h1> 🥺`;
    }

    fetch(filteredData)
      .then((response) => response.json())
      .then((data) => {
        const meals = data.meals;

        meals.forEach((meal) => {
          if (meal.strCategory === selectedCategory) {
            container.innerHTML = "";
            let i = 0;
            for (let i = 0; i < meals.length; i++) {
              rendrerData(meals[i]);
            }
            

            container.childNodes.forEach((box) => {
              box.addEventListener("click", (e) => {
                container.style.display = "none";
                secondContainer.style.display = "flex";
                secondContainer.setAttribute("class", "secondContainer");

                const data = e.target.data;

                const mealImg = e.target.src;

                const mealImgDiv = document.createElement("div");
                mealImgDiv.setAttribute("class", "mealImgDiv");
                const mealImgTag = document.createElement("img");
                mealImgDiv.appendChild(mealImgTag);
                mealImgTag.src = mealImg;
                secondContainer.appendChild(mealImgDiv);

                const mealTitleDiv = document.createElement("div");
                mealTitleDiv.setAttribute("class", "mealTitleDiv");
                const mealTitle = document.createElement("h1");
                mealTitle.innerHTML = data.strMeal;
                mealTitleDiv.appendChild(mealTitle);
                secondContainer.appendChild(mealTitleDiv);
                const insturctionDiv = document.createElement("div");
                insturctionDiv.setAttribute("class", "insturctionDiv");
                const insturction = document.createElement("p");
                insturction.innerHTML = data.strInstructions;
                insturctionDiv.appendChild(insturction);
                secondContainer.appendChild(insturctionDiv);
                const titleAndInsturctionDiv = document.createElement("div");
                titleAndInsturctionDiv.setAttribute(
                  "class",
                  "titleAndInsturctionDiv"
                );
                titleAndInsturctionDiv.appendChild(mealTitleDiv);
                titleAndInsturctionDiv.appendChild(insturctionDiv);
                secondContainer.appendChild(titleAndInsturctionDiv);
                const infoDiv = document.createElement("div");
                infoDiv.setAttribute("class", "infoDiv");
                const info = document.createElement("ul");
                info.innerHTML = `
                <li>Area: ${data.strArea}</li>
                <li>Category: ${data.strCategory}</li>
                <li>Tags: ${data.strTags}</li>
                `;
                if (data.strTags === null) {
                  info.innerHTML = `
                    <li>Area: ${data.strArea}</li>
                    <li>Category: ${data.strCategory}</li>
                    <li>Tags: No tags</li>
                  `;
                }

                infoDiv.appendChild(info);
                mealImgDiv.appendChild(infoDiv);
                const ingredientsTitle = document.createElement("h2");
                ingredientsTitle.innerHTML = "Ingredients:";
                ingredientsTitle.setAttribute("class", "ingredientsTitle");
                mealImgDiv.appendChild(ingredientsTitle);

                const ingredientsDiv = document.createElement("div");
                ingredientsDiv.setAttribute("class", "ingredientsDiv");
                const ingredients = document.createElement("ul");
                ingredientsDiv.appendChild(ingredients);
                mealImgDiv.appendChild(ingredientsDiv);

                for (let i = 1; i < 20; i++) {
                  if (data[`strIngredient${i}`] !== "") {
                    const ingredient = document.createElement("li");
                    ingredient.innerHTML = `${data[`strIngredient${i}`]} - ${
                      data[`strMeasure${i}`]
                    }`;
                    ingredients.appendChild(ingredient);
                  }
                }

                const youtubeIfame = document.createElement("iframe");
                youtubeIfame.setAttribute("class", "youtubeIfame");
                youtubeIfame.src = `https://www.youtube.com/embed/${data.strYoutube.slice(
                  -11
                )}`;
                if (data.strYoutube === null) {
                  youtubeIfame.style.display = "none";
                }

                titleAndInsturctionDiv.appendChild(youtubeIfame);
              });
            });
          }
        });
      });
  });
}

getMealByCategory();

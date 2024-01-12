const BASE_URL = process.env.BASE_URL || "http://localhost:3002";

const recipes = [
    {
        name: "Spaghetti Carbonara",
        description: "Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
        instructions: "Cook spaghetti, mix with cooked pancetta, eggs, and cheese.",
        prepTime: 10,
        cookTime: 20,
        servings: 4,
        category: "Main",
        season: "All",
        imageURL: `${BASE_URL}/images/spaghetti_carbonara.jpg`,
        userId: 1,
    },
    {
        name: "Margherita Pizza",
        description: "Traditional Italian pizza with tomatoes, sliced mozzarella, basil, and extra-virgin olive oil.",
        instructions: "Prepare dough, add toppings, and bake in oven.",
        prepTime: 30,
        cookTime: 20,
        servings: 2,
        category: "Main",
        season: "All",
        imageURL: `${BASE_URL}/images/margherita_pizza.jpg`,
        userId: 1,
    },
    {
        name: "Classic Cheeseburger",
        description: "Grilled beef patty with cheese, lettuce, tomato, and onion on a bun.",
        instructions: "Grill beef patty, melt cheese on top, assemble the burger with toppings.",
        prepTime: 15,
        cookTime: 10,
        servings: 1,
        category: "Main",
        season: "Summer",
        imageURL: `${BASE_URL}/images/cheeseburger.jpg`,
        userId: 1,
    },
    {
        name: "Chicken Alfredo",
        description: "Creamy pasta with chicken and Parmesan cheese",
        instructions: "Cook pasta, sauté chicken, mix with Alfredo sauce, and garnish with parsley.",
        prepTime: 15,
        cookTime: 30,
        servings: 4,
        category: "Main",
        season: "All",
        imageURL: `${BASE_URL}/images/chicken_alfredo.jpg`,
        userId: 1,
    },
    {
        name: "Beef Stew",
        description: "Hearty stew made with beef, potatoes, and carrots",
        instructions: "Brown beef, add vegetables and broth, and simmer until tender.",
        prepTime: 20,
        cookTime: 120,
        servings: 6,
        category: "Main",
        season: "Winter",
        imageURL: `${BASE_URL}/images/beef_stew.jpg`,
        userId: 1,
    },
    {
        name: "Pasta",
        description: "Pasta with tomato sauce",
        instructions: "Cook the pasta, add the tomato sauce",
        prepTime: 10,
        cookTime: 20,
        servings: 4,
        category: "Main",
        season: "All",
        imageURL: `${BASE_URL}/images/pasta.jpg`,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
    },
    {
        name: "Grilled Cheese Sandwich",
        description: "A quick and classic grilled cheese sandwich",
        instructions: "Place cheese between slices of bread and grill until golden brown",
        prepTime: 5,
        cookTime: 10,
        servings: 1,
        category: "Snack",
        season: "All",
        imageURL: `${BASE_URL}/images/grilled_cheese.jpg`,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
    },
    {
        name: "Chicken Tikka Masala",
        description: "Indian curry dish with marinated chicken pieces in a creamy tomato sauce.",
        instructions: "Marinate and grill chicken, prepare sauce with tomatoes, cream, and spices.",
        prepTime: 20,
        cookTime: 40,
        servings: 4,
        category: "Main",
        season: "All",
        imageURL: `${BASE_URL}/images/chicken_tikka_masala.jpg`,
        userId: 1,
    },
    {
        name: "Fish Tacos",
        description: "Tacos filled with grilled or fried fish, topped with a zesty slaw and creamy sauce.",
        instructions: "Prepare fish, assemble tacos with toppings and sauces.",
        prepTime: 15,
        cookTime: 15,
        servings: 2,
        category: "Main",
        season: "Summer",
        imageURL: `${BASE_URL}/images/fish_tacos.jpg`,
        userId: 1,
    },
    {
        name: "Ratatouille",
        description: "French vegetable stew made with zucchini, eggplant, peppers, and tomato.",
        instructions: "Slice vegetables, layer in a dish, and bake.",
        prepTime: 30,
        cookTime: 60,
        servings: 4,
        category: "Main",
        season: "All",
        imageURL: `${BASE_URL}/images/ratatouille.jpg`,
        userId: 1,
    },
    {
        name: "Pad Thai",
        description: "Thai stir-fried noodles with eggs, fish sauce, tamarind juice, red chili pepper, plus bean sprouts, chicken, shrimp, or tofu.",
        instructions: "Stir-fry noodles with proteins and sauces, serve with lime wedges.",
        prepTime: 15,
        cookTime: 15,
        servings: 2,
        category: "Main",
        season: "All",
        imageURL: `${BASE_URL}/images/pad_thai.jpg`,
        userId: 1,
    },
    {
        name: "Butternut Squash Soup",
        description: "Creamy soup made from roasted butternut squash, onions, and herbs.",
        instructions: "Roast squash, blend with sautéed onions and broth.",
        prepTime: 15,
        cookTime: 45,
        servings: 4,
        category: "Soup",
        season: "Fall",
        imageURL: `${BASE_URL}/images/butternut_squash_soup.jpg`,
        userId: 1,
    },
    {
        name: "Caesar Salad",
        description: "Classic salad with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.",
        instructions: "Toss lettuce with croutons, cheese, and dressing.",
        prepTime: 10,
        cookTime: 0,
        servings: 2,
        category: "Salad",
        season: "All",
        imageURL: `${BASE_URL}/images/caesar_salad.jpg`,
        userId: 1,
    },
    {
        name: "Mushroom Risotto",
        description: "Creamy Italian rice dish cooked with broth and flavored with mushrooms, onions, garlic, and Parmesan cheese.",
        instructions: "Cook risotto rice with broth, add sautéed mushrooms and cheese.",
        prepTime: 10,
        cookTime: 30,
        servings: 4,
        category: "Main",
        season: "All",
        imageURL: `${BASE_URL}/images/mushroom_risotto.jpg`,
        userId: 1,
    },
    {
        name: "Beef Bourguignon",
        description: "French beef stew braised in red wine, often with mushrooms, onions, and bacon.",
        instructions: "Brown beef, simmer with wine and vegetables.",
        prepTime: 20,
        cookTime: 180,
        servings: 6,
        category: "Main",
        season: "Winter",
        imageURL: `${BASE_URL}/images/beef_bourguignon.jpg`,
        userId: 1,
    },
    {
        name: "Chicken Caesar Wrap",
        description: "Grilled chicken with Caesar salad wrapped in a flour tortilla.",
        instructions: "Grill chicken, combine with salad, wrap in tortilla.",
        prepTime: 10,
        cookTime: 10,
        servings: 2,
        category: "Snack",
        season: "All",
        imageURL: `${BASE_URL}/images/chicken_caesar_wrap.jpg`,
        userId: 1,
    },
    {
        name: "Banana Bread",
        description: "Sweet bread made with mashed bananas.",
        instructions: "Combine ingredients and bake in a loaf pan.",
        prepTime: 15,
        cookTime: 60,
        servings: 8,
        category: "Dessert",
        season: "All",
        imageURL: `${BASE_URL}/images/banana_bread.jpg`,
        userId: 1,
    },
    // pause
    {
        name: "Chocolate Chip Cookies",
        description: "Classic homemade chocolate chip cookies.",
        instructions: "Mix ingredients, form into cookies, and bake until golden brown.",
        prepTime: 20,
        cookTime: 12,
        servings: 24,
        category: "Dessert",
        season: "All",
        imageURL: "${BASE_URL}/images/chocolate_chip_cookies.jpg",
        userId: 1
    },
    {
        name: "Chicken Alfredo Pasta",
        description: "Creamy Alfredo sauce with grilled chicken over pasta.",
        instructions: "Cook pasta, grill chicken, and mix with Alfredo sauce.",
        prepTime: 30,
        cookTime: 20,
        servings: 4,
        category: "Main Dish",
        season: "All",
        imageURL: "${BASE_URL}/images/chicken_alfredo_pasta.jpg",
        userId: 1
    },
    {
        name: "Vegetarian Stir-Fry",
        description: "Colorful mix of fresh vegetables stir-fried to perfection.",
        instructions: "Chop veggies, stir-fry in a pan, and season with soy sauce.",
        prepTime: 15,
        cookTime: 10,
        servings: 6,
        category: "Vegetarian",
        season: "All",
        imageURL: "${BASE_URL}/images/vegetarian_stir_fry.jpg",
        userId: 1
    },
    {
        name: "Grilled Salmon",
        description: "Juicy salmon fillets marinated and grilled to perfection.",
        instructions: "Marinate salmon, grill until flaky, and serve with lemon wedges.",
        prepTime: 25,
        cookTime: 15,
        servings: 4,
        category: "Seafood",
        season: "Spring/Summer",
        imageURL: "${BASE_URL}/images/grilled_salmon.jpg",
        userId: 1
    },
    {
        name: "Caprese Salad",
        description: "Refreshing salad with tomatoes, fresh mozzarella, and basil.",
        instructions: "Slice tomatoes and mozzarella, arrange with basil leaves, and drizzle with balsamic glaze.",
        prepTime: 15,
        cookTime: 0,
        servings: 4,
        category: "Salad",
        season: "Summer",
        imageURL: "${BASE_URL}/images/caprese_salad.jpg",
        userId: 1
    },
    {
        name: "Beef Tacos",
        description: "Savory beef filling in crispy taco shells with toppings.",
        instructions: "Cook seasoned beef, assemble tacos, and add your favorite toppings.",
        prepTime: 20,
        cookTime: 15,
        servings: 8,
        category: "Mexican",
        season: "All",
        imageURL: "${BASE_URL}/images/beef_tacos.jpg",
        userId: 1
    },
    {
        name: "Pumpkin Soup",
        description: "Creamy and flavorful soup made with roasted pumpkins.",
        instructions: "Roast pumpkins, blend with spices, and simmer to perfection.",
        prepTime: 30,
        cookTime: 25,
        servings: 6,
        category: "Soup",
        season: "Fall",
        imageURL: "${BASE_URL}/images/pumpkin_soup.jpg",
        userId: 1
    },
    {
        name: "Shrimp Scampi",
        description: "Lemon-garlic butter sauce with succulent shrimp over pasta.",
        instructions: "Sauté shrimp in garlic butter, add lemon juice, and toss with pasta.",
        prepTime: 20,
        cookTime: 15,
        servings: 4,
        category: "Seafood",
        season: "All",
        imageURL: "${BASE_URL}/images/shrimp_scampi.jpg",
        userId: 1
    },
    {
        name: "Vegetable Curry",
        description: "Hearty and flavorful curry with a variety of vegetables.",
        instructions: "Simmer vegetables in curry sauce and serve over rice.",
        prepTime: 25,
        cookTime: 30,
        servings: 6,
        category: "Vegetarian",
        season: "All",
        imageURL: "${BASE_URL}/images/vegetable_curry.jpg",
        userId: 1
    },
    {
        name: "Blueberry Pancakes",
        description: "Fluffy pancakes filled with sweet blueberries.",
        instructions: "Mix batter, fold in blueberries, and cook until golden brown.",
        prepTime: 15,
        cookTime: 10,
        servings: 4,
        category: "Breakfast",
        season: "All",
        imageURL: "${BASE_URL}/images/blueberry_pancakes.jpg",
        userId: 1
    },
    {
        name: "Teriyaki Chicken",
        description: "Sweet and savory teriyaki-glazed chicken served with rice.",
        instructions: "Marinate chicken, grill or bake, and glaze with teriyaki sauce.",
        prepTime: 25,
        cookTime: 20,
        servings: 4,
        category: "Asian",
        season: "All",
        imageURL: "${BASE_URL}/images/teriyaki_chicken.jpg",
        userId: 1
    },
    {
        name: "Vegetarian Quesadillas",
        description: "Cheesy quesadillas with a variety of sautéed vegetables.",
        instructions: "Sauté veggies, assemble in tortillas, and cook until cheese is melted.",
        prepTime: 20,
        cookTime: 10,
        servings: 4,
        category: "Vegetarian",
        season: "All",
        imageURL: "${BASE_URL}/images/vegetarian_quesadillas.jpg",
        userId: 1
    }
];

module.exports = recipes;
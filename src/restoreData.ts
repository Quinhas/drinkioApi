import axios from 'axios';

const http = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
});

const drinkioApi = axios.create({
  baseURL: 'http://localhost:3001',
});

type CategoryProps = {
  id: string;
  desc: string;
  originalName: string;
  thumb: string;
  createdAt: string;
  updatedAt: string;
  error?: {};
};

type GlassProps = {
  id: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  error?: {};
};

export type DrinkProps = {
  name: string;
  categoryId: number;
  alcoholic: boolean;
  glassId: number;
  instructions: string;
  thumb?: string;
  ingredients: object;
  measures: object;
};

type DrinkApiProps = {
  [key: string]: any;
  idDrink: any;
  strDrink: any;
  strDrinkAlternate: any;
  strTags: any;
  strVideo: any;
  strCategory: any;
  strIBA: any;
  strAlcoholic: any;
  strGlass: any;
  strInstructions: any;
  strInstructionsES: any;
  strInstructionsDE: any;
  strInstructionsFR: any;
  strInstructionsIT: any;
  'strInstructionsZH-HANS': any;
  'strInstructionsZH-HANT': any;
  strDrinkThumb: any;
  strIngredient1: any;
  strIngredient2: any;
  strIngredient3: any;
  strIngredient4: any;
  strIngredient5: any;
  strIngredient6: any;
  strIngredient7: any;
  strIngredient8: any;
  strIngredient9: any;
  strIngredient10: any;
  strIngredient11: any;
  strIngredient12: any;
  strIngredient13: any;
  strIngredient14: any;
  strIngredient15: any;
  strMeasure1: any;
  strMeasure2: any;
  strMeasure3: any;
  strMeasure4: any;
  strMeasure5: any;
  strMeasure6: any;
  strMeasure7: any;
  strMeasure8: any;
  strMeasure9: any;
  strMeasure10: any;
  strMeasure11: any;
  strMeasure12: any;
  strMeasure13: any;
  strMeasure14: any;
  strMeasure15: any;
  strImageSource: any;
  strImageAttribution: any;
  strCreativeCommonsConfirmed: any;
  dateModified: any;
};

async function init() {
  console.log('||||||||||||||||||||||||');
  console.log('||     CATEGORIAS     ||');
  console.log('||||||||||||||||||||||||');
  const { data: _categories }: { data: { drinks: { strCategory: string }[] } } =
    await http.get('/list.php?c=list');
  const categories: CategoryProps[] = await Promise.all(
    _categories.drinks.map(async ({ strCategory }) => {
      const {
        data,
      }: {
        data: {
          drinks: {
            strDrink: string;
            strDrinkThumb: string;
            idDrink: string;
          }[];
        };
      } = await http.get(`/filter.php?c=${strCategory}`);

      const thumb = data.drinks[0].strDrinkThumb;

      const _category = {
        originalName: strCategory.toUpperCase().trim(),
        desc: strCategory
          .toUpperCase()
          .trim()
          .replace(/([A-Za-z])\/([A-Za-z])/g, '$1 / $2'),
        thumb: thumb,
      };

      try {
        const { data: category } = await drinkioApi.post(
          '/categories',
          _category
        );
        console.log(`Categoria ${_category.desc} cadastrada com sucesso.`);
        return {
          ...category,
          originalName: strCategory.toUpperCase().trim(),
        };
      } catch (error) {
        console.log(`ERRO: Categoria ${_category.desc} não cadastrada.`);
        return {
          ..._category,
          error: error,
        };
      }
    })
  );

  // const dirFile = `./json/`;
  // if (!fs.existsSync(dirFile)) {
  //   fs.mkdirSync(dirFile);
  // }

  // fs.writeFileSync(`${dirFile}/categories.json`, JSON.stringify(categories));

  console.log('||||||||||||||||||||||||');
  console.log('||        COPOS       ||');
  console.log('||||||||||||||||||||||||');

  const { data: _glasses }: { data: { drinks: { strGlass: string }[] } } =
    await http.get('/list.php?g=list');
  const glasses: GlassProps[] = await Promise.all(
    _glasses.drinks.map(async ({ strGlass }) => {
      const _glass = {
        desc: strGlass.toUpperCase().trim(),
      };

      try {
        const { data: glass } = await drinkioApi.post('/glasses', _glass);
        console.log(`Copo ${_glass.desc} cadastrado com sucesso.`);
        return glass;
      } catch (error) {
        console.log(`ERRO: Copo ${_glass.desc} não cadastrado.`);
        return {
          ..._glass,
          error: error,
        };
      }
    })
  );

  // fs.writeFileSync(`${dirFile}/glasses.json`, JSON.stringify(glasses));

  const filteredCategories = categories.filter((category) => !category.error);
  const filteredGlasses = glasses.filter((glass) => !glass.error);

  console.log('||||||||||||||||||||||||');
  console.log('||       DRINKS       ||');
  console.log('||||||||||||||||||||||||');

  const drinks = await Promise.all(
    filteredCategories.map(async (category) => {
      const {
        data: _drinks,
      }: {
        data: {
          drinks: {
            strDrink: string;
            strDrinkThumb: string;
            idDrink: string;
          }[];
        };
      } = await http.get(`/filter.php?c=${category.originalName}`);

      const updatedDrinks = await Promise.all(
        _drinks.drinks.map(async (drink) => {
          const { data: _drink }: { data: { drinks: DrinkApiProps[] } } =
            await http.get(`/lookup.php?i=${drink.idDrink}`);
          const drinkToBeFormatted = _drink.drinks[0];

          const glass = filteredGlasses.find(
            (_glass) =>
              _glass.desc ===
              String(drinkToBeFormatted.strGlass).toUpperCase().trim()
          );

          if (!glass) {
            return {
              name: drinkToBeFormatted.strDrink,
              error: `Copo não encontrado: ${String(drinkToBeFormatted.strGlass)
                .toUpperCase()
                .trim()}`,
            };
          }

          const ingredients: { [key: string]: any } = {};
          const measures: { [key: string]: any } = {};
          for (let i = 0; i < 15; i++) {
            if (drinkToBeFormatted?.[`strIngredient${i}`]) {
              ingredients[`ingredient${i}`] =
                drinkToBeFormatted[`strIngredient${i}`];
            }
            if (drinkToBeFormatted?.[`strMeasure${i}`]) {
              measures[`measure${i}`] = drinkToBeFormatted[`strMeasure${i}`];
            }
          }

          const updatedDrink: DrinkProps = {
            name: drinkToBeFormatted.strDrink,
            alcoholic:
              drinkToBeFormatted.strAlcoholic === 'Alcoholic' ? true : false,
            categoryId: Number(category.id),
            glassId: Number(glass.id),
            thumb: drinkToBeFormatted.strDrinkThumb,
            ingredients: ingredients,
            measures: measures,
            instructions: drinkToBeFormatted.strInstructions,
          };

          try {
            const { data: drink } = await drinkioApi.post(
              '/drinks',
              updatedDrink
            );
            console.log(`Drink ${updatedDrink.name} cadastrado com sucesso.`);
            return drink;
          } catch (error) {
            console.log(`ERRO: Drink ${updatedDrink.name} não cadastrado.`);
            return {
              ...updatedDrink,
              error: error,
            };
          }
        })
      );
    })
  );

  // fs.writeFileSync(`${dirFile}/drinks.json`, JSON.stringify(drinks));
}

init();

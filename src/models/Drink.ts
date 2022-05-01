export type DrinkInput = {
  name: string;
  categoryId: number;
  alcoholic: boolean;
  glassId: number;
  instructions: string;
  thumb?: string;
  ingredients: object;
  measures: object;
};

const apiRoute = {
  add: '/main/games/bulk',
  delete: '/main/games/:id',
  edit: '/main/games/:id',
  getAll: '/main/games',
  getOne: '/main/games/:id',
  addWinner: '/main/games/:id/winners',
  getQuizWinner: '/main/games/winner/:id',
  getAllCampaign: '/main/campaigns',
  getAutoCompleteQuiz: '/main/games/active',
};

export default apiRoute;

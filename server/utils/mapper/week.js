function weekListViewModel(week) {
  return {
    id: week._id,
    title: week.title,
    subTitle: week.subTitle,
    trimester: week.trimester,
  };
}

module.exports = {
  weekListViewModel,
};

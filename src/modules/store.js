const addLocal = (listToStore) => {
    localStorage.setItem('taskList', JSON.stringify(listToStore));
  };
  
  const loadLocal = () => {
    const listToLoad = JSON.parse(localStorage.getItem('taskList'));
    if (listToLoad === null) {
      return [];
    }
    return listToLoad;
  };
  
  export { addLocal, loadLocal };
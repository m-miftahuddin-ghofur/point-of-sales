module.exports = {
    success: (res, status, result) => {
    //   let format = result.map (item => {
    //     return {
    //       id: item.id,
    //       book: item.category,
    //     };
    //   });
      let form = {
        status,
        result: result,
      };
      res.json (form);
    },
};
  
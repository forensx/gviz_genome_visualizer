import axios from 'axios';

export const getProjects = () => {
  return axios
    .get("http://localhost:5000/api/projects", {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var data = [];
      Object.keys(res.data).forEach(function(key) {
        var val = res.data[key];
        data.push([val.title, val._id]);
      });

      return data;
    });
};
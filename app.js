// Belly_Button_Dashboard

// 1) Read in the samples.json data using D3

d3.json("samples.json").then(function(data){

    // Confirming the data was passed succesfully
    console.log(data);

    // Define an array to store samples
    var samples_array = Array();

    // An array for the otu_ids
    var id_array = Array();

    // An array for the otu_labels

    // Iterate over each element in the samples object
    data.samples.forEach(element => {
        samples_array.push(element.sample_values);
        id_array.push(element.otu_ids);
    });

    console.log(id_array.slice(0 , 2));

    

















});
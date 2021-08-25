// Belly_Button_Dashboard

// 1) Read in the samples.json data using D3

d3.json("samples.json").then(function(data){

    // Confirming the data was passed succesfully
    console.log(data);

// Bar Chart

    // Define an array to store samples
    var values_array = Array();

    // An array for the otu_ids
    var otu_id_array = Array();

    // An array for the otu_labels
    var otu_labels_array = Array();

    // Iterate over each element in the json object to append arrays
    data.samples.forEach(element => {
        values_array.push(element.sample_values);
        otu_id_array.push(element.otu_ids);
        otu_labels_array.push(element.otu_labels);
    });

    // Rendering the initial bar chart
        var bar_data = [{
            x: values_array[0].slice(0,10),
            labels: otu_id_array[0].slice(0,10),
            orientation: 'h' ,
            type: 'bar'

        }];

        Plotly.newPlot("bar" , bar_data)


    console.log( values_array[0][0]);

    

















});
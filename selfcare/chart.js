function createChart(physicalScore, psychScore, emotionalScore, spiritualScore, relationshipScore, professionalScore) {
    const ctx = document.getElementById('myChart');
	
	ctx.html = ""; // todo this was hopefully supposed to clear old entries but it doesnt >:(
	
	// todo. figure out how to clear the chart properly. bleugh.
	
    var chart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['Physical', 'Psychological', 'Emotional', 'Spritual', 'Relationship', 'Professional'],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [physicalScore, psychScore, emotionalScore, spiritualScore, relationshipScore, professionalScore],
                    backgroundColor: [
                        Color('#ED68A6').alpha(.5).rgbString(), 
						Color('#F59D65').alpha(.5).rgbString(), 
						Color('#F5DF76').alpha(.5).rgbString(), 
						Color('#97F56C').alpha(.5).rgbString(), 
						Color('#5EDEE0').alpha(.5).rgbString(), 
						Color('#8C74EA').alpha(.5).rgbString()
                    ]
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    pointLabels: {
                        display: true,
                        centerPointLabels: true,
                        font: {
                            size: 18
                        }
                    }
                }
            },
			scale: {
        ticks: {
            min: 0,
            max: 100
        }
      },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Self-Care Assessment Results'
                }
            }
        },
    });
}
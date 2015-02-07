// Create a new directed graph
var g = new dagreD3.graphlib.Graph().setGraph({});

// States along the process
var states = [
  'On Contract?', 'Use It!', 'What are you sourcing?', 'Construction Process',
  'Emergency Purchase?', 'Wallace Act', 'Sole Sourced?',
  'Sole Source Department RFP', 'Department RFP', 'Under $2,000?',
  'Explanatory Process', 'Over $30,000?', 'County RFP Process',
  'Multiple Use?', 'Phone Quote', 'Is it a service?',
  'Between $10,000 & $30,000?', 'Bid Inquiry (B-Bid)'
]

// Automatically label each of the nodes
states.forEach(function(state) { g.setNode(state, { label: state }); });

// Set up the edges
g.setEdge('On Contract?', 'Use It!', { label: 'Yes' });
g.setEdge('On Contract?', 'What are you sourcing?', { label: 'No' });
g.setEdge('What are you sourcing?', 'Construction Process', { label: 'Construction' });
g.setEdge('What are you sourcing?', 'Emergency Purchase?', { label: 'Professional Services' });
g.setEdge('What are you sourcing?', 'Under $2,000?', { label: 'Goods/Services' });
g.setEdge('Emergency Purchase?', 'Sole Sourced?', { label: 'No (Professional Services)' });
g.setEdge('Emergency Purchase?', 'Wallace Act', { label: 'Yes' });
g.setEdge('Sole Sourced?', 'Department RFP', { label: 'No' });
g.setEdge('Sole Sourced?', 'Sole Source Department RFP', { label: 'Yes' });
g.setEdge('Under $2,000?', 'Explanatory Process', { label: 'Yes' });
g.setEdge('Under $2,000?', 'Emergency Purchase?', { label: 'No' });
g.setEdge('Emergency Purchase?', 'Over $30,000?', { label: 'No (Goods/Services)' });
g.setEdge('Emergency Purchase?', 'Wallace Act', { label: 'Yes' });
g.setEdge('Over $30,000?', 'County RFP Process', { label: 'Yes' });
g.setEdge('Over $30,000?', 'Multiple Use?', { label: 'No' });
g.setEdge('Multiple Use?', 'Phone Quote', {label: 'No'});
g.setEdge('Multiple Use?', 'Is it a service?', {label: 'Yes'});
g.setEdge('Is it a service?', 'Between $10,000 & $30,000?', {label: 'Yes'});
g.setEdge('Is it a service?', 'Phone Quote', {label: 'No'});
g.setEdge('Between $10,000 & $30,000?', 'Phone Quote', {label: 'No'});
g.setEdge('Between $10,000 & $30,000?', 'Bid Inquiry (B-Bid)', {label: 'Yes'});

// Set some general styles
g.nodes().forEach(function(v) {
  var node = g.node(v);
  node.rx = node.ry = 5;
});

var svg = d3.select("#tree-chart").select('svg'),
    inner = svg.select('g');

// Set up zoom support
var zoom = d3.behavior.zoom().on("zoom", function() {
      inner.attr("transform", "translate(" + d3.event.translate + ")" +
                                  "scale(" + d3.event.scale + ")");
    });
svg.call(zoom);

// Create the renderer
var render = new dagreD3.render();

// Run the renderer. This is what draws the final graph.
render(inner, g);

// Center the graph
var initialScale = 0.75;

zoom
  .scale(initialScale)
  .event(svg);

svg.attr('height', g.graph().height * initialScale + 40);

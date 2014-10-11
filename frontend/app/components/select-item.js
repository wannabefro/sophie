import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'strong',
  selectedColor: null,
  selectedItem: null,
  previousItem: null,
  previousColor: null,
  editing: true,
  imageData: null,
  isInserted: false,

  setDefaults: function() {
    var self = this;
    this.send('resetItem');
    setTimeout(function() {self.set('isInserted', true)}, 250);
  }.on('init'),

  setup: function() {
    $('#new-story-artwork').append('<div id="' + this.get("name") + '"></div>');
    this.send('drawImage', 'paint');
  }.observes('isInserted'),

  hasChanged: function() {
    return (this.get('selectedItem') !== this.get('previousItem') && this.get('selectedColor') !== this.get('previousColor'));
  }.observes('selectedItem', 'selectedColor'),

  loadImage: function() {
    var self = this;
    var location = 'assets/svgs/' + this.get('selectedItem') + '.json';
    $.getJSON(location).then(function(data) {
      self.set('imageData', data);
      self.send('drawImage', 'paint');
    });
    return true;
  }.observes('selectedItem'),

  changeColor: function() {
    if (this.get('selectedItem')) {
      this.send('drawImage', 'stamp');
    }
  }.observes('selectedColor'),

  actions: {
    drawImage: function(drawingMethod) {
      this.send('setupImageDiv');
      $('#' + this.get('selectedItem')).lazylinepainter({
        "svgData": this.get('imageData'),
        "strokeWidth": 2,
        "stokeCap": "round",
        "strokeColor": this.get('selectedColor')
      }).lazylinepainter(drawingMethod);
    },

    setupImageDiv: function() {
      $('#' + this.get('name')).empty();
      $('#' + this.get('name')).append('<div id="' + this.get('selectedItem') + '"></div>');
    },

    resetItem: function() {
      this.setProperties({'selectedItem': this.get('items')[0], 'selectedColor': this.get('colors')[0]})
    }
  }
});

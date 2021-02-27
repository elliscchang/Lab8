describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75');

    cy.get('#volume-slider').then($el => {
      expect($el).to.have.value(75);
    });
  });

  it('Input changes when slider input changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input');

    cy.get('#volume-number').then($el => {
      expect($el).to.have.value(33);
    });
  });

  it('Volume of audio element changes when slider input changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input');

    cy.get('#horn-sound').then($el => {
      expect($el).to.have.prop('volume', 0.33);
    });
  });

  it('Image and sound sources change when you select party horn radio button', () => {
    cy.get('#radio-party-horn').click();

    cy.get('#sound-image').then($el => {
      expect($el).to.have.attr('src', './assets/media/images/party-horn.svg');
    });

    cy.get('#horn-sound').then($el => {
      expect($el).to.have.attr('src', './assets/media/audio/party-horn.mp3');
    });
  });

  it('Volume image changes when increasing volume level from 0 to 1', () => {
    cy.get('#volume-slider').invoke('val', 0).trigger('input').invoke('val', 15).trigger('input');

    cy.get('#volume-image').then(($el) => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-1.svg')
    });
  })

  it('Volume image changes when increasing volume level from 1 to 2', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input').invoke('val', 60).trigger('input');

    cy.get('#volume-image').then(($el) => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-2.svg')
    });
  });

  it('Volume image changes when increasing volume level from 2 to 3', () => {
    cy.get('#volume-slider').invoke('val', 66).trigger('input').invoke('val', 100).trigger('input');

    cy.get('#volume-image').then(($el) => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-3.svg')
    });
  });

  it('Honk button is disabled when the textbox input is a empty or a non-number', () => {
    cy.get('#volume-number').clear();

    cy.get('#honk-btn').then(($el) => {
      expect($el).to.have.attr('disabled');
    });

    cy.get('#volume-number').clear().type('z');

    cy.get('#honk-btn').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
  });

  it('Error is shown when you type a number outside of given range for the volume textbox input', () => {
    cy.get('#volume-number').clear().type('101');

    cy.get('input:invalid').should('have.length', 1);
  });
});

// Initialize the Image Classifiers. A callback needs to be passed.

let classifier;
let classifier2;
let classifier3;
let classifier4;
let classifier5;
let classifier6;
let classifier7;
let classifier8;
let classifier9;
let classifier10;

/**
 * Resource points variable to hold card point to resource point scale.
 */
const resourcePoints = {
  0: 100,
  1: 200,
  2: 300,
  3: 400,
  4: 500,
  5: 600,
  6: 700,
  7: 800,
  8: 900,
  9: 1000,
  10: 1100,
  11: 1200,
  12: 1300,
};
// A variable to hold the image for classification

// A function to run when we get any errors and the results
async function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  await console.info(results);
}

const preload = async (ml5) => {
  /**
   * Human/Animal classifier
   */
  classifier = await ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/F-dtJxd-S/model.json');
  /**
   * Character/Ability classifier
   */
  classifier2 = await ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/22wMRj35M/model.json');
  /**
   * Weapon/No Weapon classifier
   */
  classifier3 = await ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/zeevdEeHo/model.json');
  /**
   * Armor/No Armor classifier
   */
  classifier4 = await ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ezCE0ytRZ/model.json');
  /**
   * Fly/No Fly classifier
   */
  classifier5 = await ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5tmt6Esof/model.json');
  /**
   * Passive/Aggressive classifier
   */
  classifier6 = await ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/mJjR8pr3X/model.json');
  /**
   * Size classifier
   */
  classifier7 = await ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/o7LofP-X4/model.json');
  /**
  * With/Without defense
  */
  classifier8 = await ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nHwORk21S/model.json');
  classifier9 = await ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/OM7sOY_VH/model.json');
  /**
   * Paradise !paradise
   */
  classifier10 = await ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_ShruFlmi/model.json');
};

const card = {};
let description = '';
let aH; let cA; let dNd; let aNa; let fNf; let tySmMLgGiTi; let pAAg; let mNm; let pNp;
let attack; let health; let armor = 0;
let hasCharge; let hasProvoke; let mdmg; let mclass;
let abilityPower; let isParadise; let typeParadise;
let totalPoints = 0;

const setup = async (thumbnail, ml5, Prob, title) => {
  const img = document.getElementById('image');
  await preload(ml5);
  /**
   * Character/Ability classifier
   */
  await classifier2.predict(img, (err, results) => {
    const destructure = Object.values(results)[0];
    cA = destructure;
  });

  if (cA.label === 'character') {
    /**
     * Human/Animal classifier
     */
    await classifier.predict(img, (err, results) => {
      const destructure = Object.values(results)[0];
      aH = destructure;
    });
    if (aH.label === 'human') {
      /**
     * With/Without defense
     */
      await classifier8.predict(img, (err, results) => {
        const destructure = Object.values(results)[0];
        dNd = destructure;
      });
    } else {
      /**
       * Passive/Aggressive classifier
       */
      await classifier6.predict(img, (err, results) => {
        const destructure = Object.values(results)[0];
        pAAg = destructure;
      });
    }
    /**
     * Armor/No Armor classifier
     */
    await classifier4.predict(img, (err, results) => {
      const destructure = Object.values(results)[0];
      aNa = destructure;
    });
    /**
     * Fly/No Fly classifier
     */
    await classifier5.predict(img, (err, results) => {
      const destructure = Object.values(results)[0];
      fNf = destructure;
    });
    /**
     * Size classifier
     */
    await classifier7.predict(img, (err, results) => {
      const destructure = Object.values(results)[0];
      tySmMLgGiTi = destructure;
    });
    await classifier9.predict(img, (err, results) => {
      const destructure = Object.values(results)[0];
      mNm = destructure;
    });
  } else {
    await classifier10.predict(img, (err, results) => {
      const destructure = Object.values(results)[0];
      pNp = destructure;
    });
  }
  classifier2.classify(img, gotResult);
  if (cA.label === 'character') {
    /**
   * Human/Animal classifier
   */
    classifier.classify(img, gotResult);

    if (aH.label === 'human') {
      /**
      * With/Without weapon
      */
      classifier3.classify(img, gotResult);
      /**
      * With/Without defense
      */
      classifier8.classify(img, gotResult);
    } else if (aH.label === 'animal') {
      /**
      * Passive/Aggressive classifier
      */
      classifier6.classify(img, gotResult);
      if (pAAg.label === 'aggressive') {
        attack += Math.floor(Math.random() * (10 - 1) + 1);
        hasCharge = await Prob.probabilityCharge(hasCharge);
        if (hasCharge) {
          totalPoints += 50;
        }
      }
    }
    /**
     * Armor/No Armor classifier
     */
    classifier4.classify(img, gotResult);
    /**
     * Fly/No Fly classifier
     */
    classifier5.classify(img, gotResult);
    /**
     * Size classifier
     */
    classifier7.classify(img, gotResult);
    if (tySmMLgGiTi.label === 'tiny') {
      attack = await Prob.probabilityTiny(attack);
      health = await Prob.probabilityTiny(health);
      if (aNa.label === 'Armor') {
        armor = await Prob.probabilityTiny(armor);
        hasProvoke = await Prob.probabilityProvoke(hasProvoke, totalPoints);
        if (hasProvoke) {
          totalPoints += 30;
        }
      }
    }
    if (tySmMLgGiTi.label === 'small') {
      attack = await Prob.probabilitySmall(attack);
      health = await Prob.probabilitySmall(health);
      if (aNa.label === 'Armor') {
        armor = await Prob.probabilitySmall(armor);
        hasProvoke = await Prob.probabilityProvoke(hasProvoke, totalPoints);
        if (hasProvoke) {
          totalPoints += 30;
        }
      }
    }
    if (tySmMLgGiTi.label === 'medium') {
      attack = await Prob.probabilityMedium(attack);
      health = await Prob.probabilityMedium(health);
      if (aNa.label === 'Armor') {
        armor = await Prob.probabilityMedium(armor);
        hasProvoke = await Prob.probabilityProvoke(hasProvoke, totalPoints);
        if (hasProvoke) {
          totalPoints += 30;
        }
      }
    }
    if (tySmMLgGiTi.label === 'large') {
      attack = await Prob.probabilityLarge(attack);
      health = await Prob.probabilityLarge(health);
      if (aNa.label === 'Armor') {
        armor = await Prob.probabilityLarge(armor);
        hasProvoke = await Prob.probabilityProvoke(hasProvoke, totalPoints);
        if (hasProvoke) {
          totalPoints += 30;
        }
      }
    }
    if (tySmMLgGiTi.label === 'giant') {
      attack = await Prob.probabilityGiant(attack);
      health = await Prob.probabilityGiant(health);
      if (aNa.label === 'Armor') {
        armor = await Prob.probabilityGiant(armor);
        hasProvoke = await Prob.probabilityProvoke(hasProvoke, totalPoints);
        if (hasProvoke) {
          totalPoints += 30;
        }
      }
    }
    if (tySmMLgGiTi.label === 'titan') {
      attack = await Prob.probabilityTitan(attack);
      health = await Prob.probabilityTitan(health);
      if (aNa.label === 'Armor') {
        armor = await Prob.probabilityTitan(armor);
        hasProvoke = await Prob.probabilityProvoke(hasProvoke, totalPoints);
        if (hasProvoke) {
          totalPoints += 30;
        }
      }
    }
    classifier9.classify(img, gotResult);
    if (fNf.label === 'Fly') {
      totalPoints += 50;
    }
  } else if (pNp.label === 'Paradise') {
    isParadise = true;
    abilityPower = await Prob.probabilitySmall(abilityPower) / 2;
    typeParadise = await Prob.probabilityParadise(typeParadise);
  } else {
    abilityPower = await Prob.probabilitySmall(abilityPower);
  }

  if (cA.label === 'character') {
    armor = Math.floor(armor / 2);
    totalPoints += (attack + health + (armor * 2)) * 7;

    for (let i = 0; i < Object.keys(resourcePoints).length; i += 1) {
      if (totalPoints === resourcePoints[i]) {
        break;
      } else {
        attack = Math.floor(
          attack - (
            totalPoints - Object.values(resourcePoints)[Object.values(resourcePoints).indexOf(
              Math.round(totalPoints / 100) * 100,
            )]) / 10,
        ) || 1;
        if (attack < 0) {
          attack = 0;
        }
        totalPoints = Object.values(resourcePoints)[Object.values(resourcePoints).indexOf(
          Math.round(totalPoints / 100) * 100,
        )];
        break;
      }
    }
    if (dNd === 'defense') {
      hasProvoke = await Prob.probabilityProvoke();
    }
    if (mNm.label === 'Magical') {
      mdmg = await Prob.probabilityMagic();
      mclass = 'magic dmg';

      if (mdmg && mclass && mclass.includes('dmg')) {
        description = `${description}\n Deal ${mdmg} magic damage to an enemy character.`;
      }
    }
    if (hasProvoke) {
      description += '\n Provoke.';
    }
    if (hasCharge) {
      description += '\n Charge.';
    }
    if (fNf.label === 'Fly') {
      description += '\n Fly.';
    }
    card.attack = attack;
    card.health = health;
    card.armor = armor;
  } else {
    if (isParadise) {
      if (typeParadise.includes('health')) {
        totalPoints += (abilityPower) * 20;
      }
      if (typeParadise.includes('armor')) {
        totalPoints += (abilityPower) * 30;
      }
      if (typeParadise.includes('attack')) {
        totalPoints += (abilityPower) * 20;
      }
    } else {
      totalPoints += (abilityPower) * 10;
    }
    for (let i = 0; i < Object.keys(resourcePoints).length; i += 1) {
      if (totalPoints === resourcePoints[i]) {
        break;
      } else {
        abilityPower = Math.floor(
          abilityPower - (
            totalPoints - Object.values(resourcePoints)[Object.values(resourcePoints).indexOf(
              Math.round(totalPoints / 100) * 100,
            )]) / 10,
        ) || 1;
        if (abilityPower < 1) {
          abilityPower = 1;
        }
        totalPoints = Object.values(resourcePoints)[Object.values(resourcePoints).indexOf(
          Math.round(totalPoints / 100) * 100,
        )];
        break;
      }
    }
    if (isParadise) {
      if (typeParadise.includes('health')) {
        description = `${description}\n Restore ${abilityPower} health.`;
      }
      if (typeParadise.includes('armor')) {
        description = `${description}\n Gain ${abilityPower} armor.`;
      }
      if (typeParadise.includes('attack')) {
        description = `${description}\n Gain ${abilityPower} attack.`;
      }
    } else {
      description = `\n Deal ${abilityPower} damage.`;
    }
  }
  card.title = title;
  card.thumbnail = thumbnail;
  card.size = tySmMLgGiTi ? tySmMLgGiTi.label : null;
  card.rp = Object.keys(resourcePoints)[Object.values(
    resourcePoints,
  ).indexOf(totalPoints)];
  card.isCharacter = cA.label === 'character';
  card.description = description;
  return card;
};

export default setup;

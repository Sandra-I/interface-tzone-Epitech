[[_TOC_]]

<!-- Supprimer les parties non applicables -->

## Description

Item # <!-- indiquer l'item -->

<!--
Au minimum, la merge request contient une description du développement :

- Pourquoi et comment
- L’ordre de déploiement est précisé, Les actions nécessaires
-->

## Dépendances

<!-- Indiquer les dépendances dans le champ prévu dans GitLab, et indiquer ici pourquoi la(les) dépendence(s) existe(nt) -->

## Captures d'écran

<!--
Si applicable :
- Inclure une capture d’écran avant et après quand quelque chose de visuel change
- Inclure une capture d’écran quand ça impacte quelque chose de visuel, pour montrer que ça ne change rien
-->

## Tests

<!-- Tout nouveau dev doit avoir des tests autos associés :

- C’est testable simplement avec mocha : indiquer la commande pour lancer le(s) test(s) mocha
- Il existe déjà des tests dans le même périmètre que le dév en question (à part code style) :
  indiquer la commande pour lancer le(s) test(s)
- Un nouveau composant d’interface doit avoir une page de test qui fonctionne : indiquer l'url de la page de test
- Si pas de tests auto, documenter la méthode de test manuelle (url, steps…)
-->

- [ ] **Tous les tests existants passent à chaque commit (hors test de taille des bundles s'il y a plusieurs commits)**
- [ ] **Les pages de test fonctionnent encore**
- [ ] **Pas de logs d’erreur pendant les tests**
### Tests sur navigateurs :
- [ ] Non applicable
- [ ] Chrome
- [ ] Firefox

## Qualité

### Gestion d'erreur
 - [ ] Non applicable
 - [ ] Il existe une gestion d’erreur
 - [ ] Aucun cas d’erreur n’est oublié
### Refactoring
 - [ ] Non applicable
 - [ ] Les refactorings sont faits dans leurs propres commits
 - [ ] Aucun commit de refactoring ne corrige de bug
### Correction de bug
 - [ ] Non applicable
 - [ ] Il y a un commit qui corrige le bug et qui ferme ce bug
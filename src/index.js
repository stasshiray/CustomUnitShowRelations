/* eslint id-length: 0 */

import $ from 'jquery';
import _ from 'underscore';

import configurator from 'tau/configurator';
import helper from 'targetprocess-mashup-helper';

import {intersectRects} from './utils/intersection';

import './index.css';

import legendTemplate from './templates/legend.html';
import svgTemplate from './templates/svg.html';

let $card;
let card;

let $grid;
let $table;
let $svg;
let $legend;
let isList;
let cardId;

const relationTypes = [
    {
        name: 'Dependency',
        style: '#000000'
    },
    {
        name: 'Blocker',
        style: '#bd0010'
    },
    {
        name: 'Relation',
        style: '#aaa'
    },
    {
        name: 'Link',
        style: '#36ab45'
    },
    {
        name: 'Duplicate',
        style: '#ff5400'
    }
];

const getRelationColor = ({style: relationStyle}) =>
    typeof relationStyle === 'object' ? relationStyle.stroke : relationStyle;

const getRelationMarkerStartId = ({name}) => `${name}_start`;
const getMasterRelationMarkerEndId = ({name}) => `${name}_master_end`;
const getSlaveRelationMarkerEndId = ({name}) => `${name}_slave_end`;

const getRelations = (entityId) => {

    const processItem = (item, type) => ({
        directionType: type.toLowerCase(),
        relationType: {
            name: item.RelationType.Name
        },
        entity: {
            id: item[type].Id
        }
    });

    return $.ajax({
        url: `${configurator.getApplicationPath()}/api/v1/generals/${entityId}` +
            `?include=[MasterRelations[Master,RelationType],SlaveRelations[Slave,RelationType]]&format=json`,
        contentType: 'application/json; charset=utf-8'
    })
    .then((res) =>
        res.MasterRelations.Items.map((v) => processItem(v, 'Master'))
            .concat(res.SlaveRelations.Items.map((v) => processItem(v, 'Slave')))
    )
    .fail(() => []);

};

const highlightSelected = (fromEl, toEl, line) => {

    $grid.addClass('mashupCustomUnitShowRelations-highlighted');
    $(fromEl).addClass('mashupCustomUnitShowRelations__highlighted');
    $(toEl).addClass('mashupCustomUnitShowRelations__highlighted');

    $svg.parent().addClass('mashupCustomUnitShowRelations__svg-highlighted');
    $(line).css('opacity', 1);

};

const unhighlightSelected = (fromEl, toEl, line) => {

    $grid.removeClass('mashupCustomUnitShowRelations-highlighted');
    $(fromEl).removeClass('mashupCustomUnitShowRelations__highlighted');
    $(toEl).removeClass('mashupCustomUnitShowRelations__highlighted');

    $svg.parent().removeClass('mashupCustomUnitShowRelations__svg-highlighted');
    $(line).removeAttr('style');

};

const generateBezier = (start, end, down = false) => {

    let points = [`M${start.x},${start.y}`];

    const rad = Math.PI / 48 * (down ? -1 : 1);

    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const centerOnLine = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2
    };

    const centerRot = {
        x: (centerOnLine.x - start.x) * cos - (centerOnLine.y - start.y) * sin + start.x,
        y: (centerOnLine.x - start.x) * sin + (centerOnLine.y - start.y) * cos + start.y
    };

    const center = `${centerRot.x},${centerRot.y}`;

    points = points.concat(`C${center}`);
    points = points.concat(center);

    return points.concat(`${end.x},${end.y}`).join(' ');

};

const drawRelation = (fromEl, toEl, relation) => {

    const ns = 'http://www.w3.org/2000/svg';
    const cardRect = fromEl.getBoundingClientRect();
    const targetRect = toEl.getBoundingClientRect();
    const tableRect = $table[0].getBoundingClientRect();

    const cardPos = {
        x: cardRect.left - tableRect.left,
        y: cardRect.top - tableRect.top,
        height: cardRect.height,
        width: cardRect.width
    };

    const targetPos = {
        x: targetRect.left - tableRect.left,
        y: targetRect.top - tableRect.top,
        height: targetRect.height,
        width: targetRect.width
    };

    const points = intersectRects(cardPos, targetPos);

    // if list, make income relations to the left, outcome to right of card
    if (isList) {

        const offset = (relation.index + 1) * 50;

        if (relation.directionType === 'master') {

            points.start.x = cardPos.x + offset;
            points.end.x = targetPos.x + offset;

        } else {

            points.start.x = cardPos.x + cardPos.width - offset;
            points.end.x = targetPos.x + targetPos.width - offset;

        }

    }

    const bezierCoords = generateBezier(points.start, points.end, relation.directionType === 'master');

    const relationType = _.findWhere(relationTypes, {
        name: relation.relationType.name
    });

    const color = getRelationColor(relationType);

    const helperLine = document.createElementNS(ns, 'path');

    helperLine.setAttribute('class', 'helperline');
    helperLine.setAttributeNS(null, 'd', bezierCoords);
    helperLine.setAttributeNS(null, 'stroke', 'grey');
    helperLine.setAttributeNS(null, 'fill', 'none');
    helperLine.setAttributeNS(null, 'stroke-width', '20');

    $svg[0].appendChild(helperLine);

    const line = document.createElementNS(ns, 'path');

    line.setAttribute('class', 'line');
    line.setAttributeNS(null, 'd', bezierCoords);
    line.setAttributeNS(null, 'stroke', color);
    line.setAttributeNS(null, 'fill', 'none');
    line.setAttributeNS(null, 'stroke-width', '2');

    if (relation.directionType === 'master') {

        line.setAttributeNS(null, 'marker-start', `url(#${getRelationMarkerStartId(relationType)})`);
        line.setAttributeNS(null, 'marker-end', `url(#${getMasterRelationMarkerEndId(relationType)})`);

    } else {

        line.setAttributeNS(null, 'marker-end', `url(#${getRelationMarkerStartId(relationType)})`);
        line.setAttributeNS(null, 'marker-start', `url(#${getSlaveRelationMarkerEndId(relationType)})`);

    }

    $svg[0].appendChild(line);

    const $lines = $(helperLine).add(line);

    $lines.on('mouseenter', () => highlightSelected(fromEl, toEl, line));
    $lines.on('mouseleave', () => unhighlightSelected(fromEl, toEl, line));

    $lines.on('click', (e) => e.stopPropagation());

    $(toEl).css('outline-color', color);
    $(fromEl).css('outline-color', color);

};

const highlightRelation = (relation) => {

    const $target = relation.$target;

    $target.addClass('mashupCustomUnitShowRelations__related');
    $target.addClass(relation.directionType === 'master' ?
            'mashupCustomUnitShowRelations__related-inbound' :
            'mashupCustomUnitShowRelations__related-outbound');

    $target.toArray().forEach((v) => drawRelation(card, v, relation));

};

const unhighlightRelated = () => {

    $grid.removeClass('mashupCustomUnitShowRelations');
    $grid.removeClass('mashupCustomUnitShowRelations-highlighted');
    $grid.find('.i-role-card').removeClass('mashupCustomUnitShowRelations__related');
    $grid.find('.i-role-card').removeClass('mashupCustomUnitShowRelations__related-inbound');
    $grid.find('.i-role-card').removeClass('mashupCustomUnitShowRelations__related-outbound');
    $grid.find('.i-role-card').removeClass('mashupCustomUnitShowRelations__source');
    $svg.remove();

    $legend.remove();

};

const highlightRelated = (relations) => {

    $table = $grid.children('table');
    isList = false;

    if (!$table.length) {

        $table = $grid.find('.i-role-list-root-container');
        isList = true;

    }

    $grid.addClass('mashupCustomUnitShowRelations');

    $card = $grid.find(`.i-role-card[data-id=${cardId}]`);
    $card.addClass('mashupCustomUnitShowRelations__source');
    card = $card[0];

    const height = $table.height();
    const width = $table.width();

    $svg = $(svgTemplate({
        relationTypes, width, height, getRelationColor, getRelationMarkerStartId,
        getMasterRelationMarkerEndId, getSlaveRelationMarkerEndId
    }));

    $svg.on('click', unhighlightRelated);

    if (isList) {

        $grid.find('.i-role-unit-editor-popup-position-within').append($svg);

    } else {

        $grid.append($svg);

    }

    let processedRelations = relations
        .map((v) => ({
            ...v,
            $target: $(`.i-role-card[data-entity-id=${v.entity.id}]`)
        }))
        .filter((v) => v.$target.length);

    if (isList) {

        processedRelations = _.groupBy(processedRelations, (v) => v.directionType);
        processedRelations = _.map(processedRelations, (list) => list.map((v, k) => ({...v, index: k})));

        processedRelations = _.reduce(processedRelations, (res, v) => res.concat(v), []);

    }

    processedRelations.forEach(highlightRelation);

};

const createLegend = (relations) => {

    const existingNames = relations
        .filter((v) => $(`.i-role-card[data-entity-id=${v.entity.id}]`).length)
        .map((v) => v.relationType.name);

    const existingRelationTypes = relationTypes.filter((v) => existingNames.indexOf(v.name) >= 0);

    const $grid = $('.i-role-grid');

    $legend = $(legendTemplate({
        relationTypes: existingRelationTypes,
        getRelationColor
    }));

    $grid.parent().append($legend);

};

helper.customUnits.add({
    id: 'my_entity_state',
    name: 'show relations',
    template: `<div class="tau-board-unit__value">
        <button type="button" class="cu-showrelations">Show relations</button>
    </div>`,
    hideIf: ({masterRelations, slaveRelations}) => !masterRelations.items.length && !slaveRelations.items.length,
    model: {
        masterRelations: 'MasterRelations',
        slaveRelations: 'SlaveRelations'
    },
    sampleData: {
        masterRelations: {items: [1]},
        slaveRelations: {items: [2]}
    }
});

$(document.body).on('click', '.cu-showrelations', (e) => {

    e.stopPropagation();
    e.preventDefault();

    $grid = $('.i-role-grid');

    const entityId = $(e.target).parents('.i-role-card').data('entityId');

    if (!entityId) {

        return;

    }

    cardId = $(e.target).parents('.i-role-card').data('id');

    getRelations(entityId)
        .then((relations) => {

            createLegend(relations);
            highlightRelated(relations);

        });

});

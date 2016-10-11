import {flatten, isFunction, dasherize} from './utils.js';


export function renderToString(...elements) {
    return flatten(elements).map(el => {
        if (!el.name) {
            return '' + (el.__asHtml || el);
        }
        const attributes = Object.keys(el.attrs)
            .filter(attribute => !attribute.startsWith('on') && el.attrs[attribute] !== undefined)
            .map(attribute => {
                const key = dasherize(attribute === 'className' ? 'class' : attribute);
                let value = el.attrs[attribute];
                if (key === 'style' && typeof value === 'object') {
                    value = Object.keys(value)
                        .map(key => '' + dasherize(key) + ':' + value[key])
                        .join(';');
                } else if (key === 'class' && typeof value === 'object') {
                    value = Object.keys(value).filter(classValue => value[classValue])
                        .map(dasherize)
                        .join(' ');
                }

                return ` ${key}="${value}"`
            })
            .join('');
        const content = renderToString(...el.children);
        return `<${el.name}${attributes}>${content}</${el.name}>`
    }).join('');
}


export function renderTo(node, ...elements) {
    let realNode = node;
    if (typeof node === 'string') {
        realNode = document.getElementById(node);
    }

    while (realNode.firstChild) {
        realNode.removeChild(realNode.firstChild);
    }

    flatten(elements).filter(element => element !== undefined && element !== null).map(convertToNode)
        .forEach(node => realNode.appendChild(node));
}

function convertToNode(element) {
    if (!element.isElem) {
        return element.__asHtml ? element : document.createTextNode('' + element);
    }

    const node = document.createElement(element.name);

    Object.keys(element.attrs)
        .filter(key => element.attrs[key] !== undefined)
        .forEach(key => {
            const value = element.attrs[key];
            if (key.startsWith('on')) {
                const eventKey = key.substring(2).toLowerCase();
                node.addEventListener(eventKey, event => value(event));
            } else {
                if (key === 'className') {
                    key = 'class';
                }
                key = dasherize(key);
                if (key === 'style' && typeof value === 'object') {
                    Object.keys(value).forEach(styleKey =>
                        node.style[dasherize(styleKey)] = value[styleKey]
                    )
                } else if (key === 'class' && typeof value === 'object') {
                    Object.keys(value).filter(classValue => value[classValue])
                        .forEach(classValue => node.classList.add(dasherize(classValue)));
                } else {
                    node.setAttribute(key, value);
                }
            }
        });

    element.children
        .filter(element => element !== undefined && element !== null)
        .map(convertToNode)
        .forEach(child => {
            if (child.__asHtml) {
                node.insertAdjacentHTML('beforeend', child.__asHtml);
            } else {
                node.appendChild(child)
            }
        });

    return node;
}

export function el(name, attrs, ...children) {
    if (isFunction(name)) {
        return name(attrs, ...children);
    }
    return {
        name,
        attrs: attrs || {},
        children: (flatten(children) || []).filter(child => child !== null && child !== undefined),
        isElem: true
    };
}

export function predicate(cond, element, elseElement) {
    const isTrue = isFunction(cond) ? cond() : cond;
    if (isTrue) {
        return isFunction(element) ? element() : element;
    }
    return isFunction(elseElement) ? elseElement() : elseElement;
}

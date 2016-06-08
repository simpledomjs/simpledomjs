import {flatten, isFunction, dasherize} from './utils.js';


export function renderToString(...elements) {
    return flatten(elements).map(el => {
        if (!el.name) {
            return '' + el;
        }
        const attributes = Object.keys(el.attrs)
            .filter(attribute => !attribute.startsWith('on'))
            .map(attribute => {
                const key = dasherize(attribute === 'className' ? 'class' : attribute);
                let value = el.attrs[attribute];

                if (key === 'style' && typeof value === 'object') {
                    value = Object.keys(value)
                        .map(key => '' + key + ':' + value[key])
                        .join(';');
                } else if (key === 'class' && typeof value === 'object') {
                    value = Object.keys(value).filter(classValue => value[classValue])
                        .join(' ');
                }

                return ` ${key}="${value}"`
            })
            .join();
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

    flatten(elements).map(convertToNode)
        .forEach(node => realNode.appendChild(node));
}

function convertToNode(element) {
    if (!element.isElem) {
        return document.createTextNode('' + element);
    }

    const node = document.createElement(element.name);

    Object.keys(element.attrs)
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
                        node.style[styleKey] = value[styleKey]
                    )
                } else if (key === 'class' && typeof value === 'object') {
                    Object.keys(value).filter(classValue => value[classValue])
                        .forEach(classValue => node.classList.add(classValue));
                } else {
                    node.setAttribute(key, value);
                }
            }
        });

    element.children
        .map(convertToNode)
        .forEach(child =>
            node.appendChild(child));

    return node;
}

export function el(name, attrs, ...children) {
    if (isFunction(name)) {
        return name(attrs, ...children);
    }
    return {
        name,
        attrs: attrs || {},
        children: flatten(children),
        isElem: true
    };
}

export function predicate(cond, element) {
    const isTrue = isFunction(cond) ? cond() : cond;
    if (isTrue) {
        return isFunction(element) ? element() : element;
    }
}

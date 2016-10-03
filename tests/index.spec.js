import * as SimpleDom from '../src/main';

import chai from 'chai';

const expect = chai.expect;

describe('SimpleDom API', () => {

    describe('SimpleDom.predicate', () => {
        it('with a function as condition', () => {
            expect(
                SimpleDom.predicate(() => true, 'result')
            ).to.be.equal('result');
            expect(
                SimpleDom.predicate(() => false, 'result')
            ).to.be.an('undefined');
        });
        it('with a boolean as condition', () => {
            expect(
                SimpleDom.predicate(true, 'result')
            ).to.be.equal('result');
            expect(
                SimpleDom.predicate(false, 'result')
            ).to.be.an('undefined');
        });
        it('with a function as result', () => {
            expect(
                SimpleDom.predicate(true, () => 'result')
            ).to.be.equal('result');
            expect(
                SimpleDom.predicate(false, () => 'result')
            ).to.be.an('undefined');
        });
        it('with an else result', () => {
            expect(
                SimpleDom.predicate(true, () => 'result', () => 'else')
            ).to.be.equal('result');
            expect(
                SimpleDom.predicate(false, () => 'result', () => 'else')
            ).to.be.equal('else');
        })
    });

    describe('SimpleDom.renderToString', () => {
        it('Simple test', () => {
            const result = SimpleDom.renderToString(
                SimpleDom.el('div', null,
                    SimpleDom.el('div', {
                        id: 'id1', onClick: () => {
                        }
                    }, 'content')
                ),
                SimpleDom.el('ul', null,
                    SimpleDom.el('li', null, '1'),
                    SimpleDom.el('li', null, '2'),
                    SimpleDom.el('li', null, '3'),
                    SimpleDom.el('li', null, '4')
                )
            );

            expect(result).to.be.equal(
                '<div><div id="id1">content</div></div><ul><li>1</li><li>2</li><li>3</li><li>4</li></ul>');
        })
    });

    describe('SimpleDom.render', () => {

        it('renderWithPredicate', () => {

            if (document.getElementById('container')) {
                document.getElementById('container').remove();
            }

            const container = document.createElement('div');
            container.id = 'container';

            document.body.appendChild(container);


            SimpleDom.renderTo(
                'container',
                SimpleDom.el('div', null, [
                    SimpleDom.el('div', {
                        id: 'id1',
                        class:{
                            testCamelCase: true,
                            noRender: false
                        },
                        style:{
                            marginTop: '5px',
                            marginBottom: '5px'
                        }
                    }, 'content'),
                    SimpleDom.predicate(false, SimpleDom.el('div', {id: 'id2'}, 'content')),
                    SimpleDom.predicate(true, SimpleDom.el('div', {id: 'id3'}, 'content'))
                ])
            );

            expect(document.getElementById("container").innerHTML).to.be.equal('<div><div id="id1" class="test-camel-case" style="margin-top: 5px; margin-bottom: 5px;">content</div><div id="id3">content</div></div>');
        });

        it('SimpleTest', () => {
            if (document.getElementById('container')) {
                document.getElementById('container').remove();
            }

            const container = document.createElement('div');
            container.id = 'container';

            document.body.appendChild(container);

            let hasClicked = false;

            SimpleDom.renderTo(
                'container',
                SimpleDom.el('div', null,
                    SimpleDom.el('div', {id: 'id1', onClick: () => { hasClicked = true }}, 'content')
                ),
                SimpleDom.el('ul', null,
                    SimpleDom.el('li', null, '1'),
                    SimpleDom.el('li', null, '2'),
                    SimpleDom.el('li', null, '3'),
                    SimpleDom.el('li', null, '4')
                )
            );

            expect(document.getElementById("container").innerHTML).to.be.equal('<div><div id="id1">content</div></div><ul><li>1</li><li>2</li><li>3</li><li>4</li></ul>');

            expect(hasClicked).to.be.false;

            document.getElementById("id1").click();

            expect(hasClicked).to.be.true;

        })
    });

    describe('SimpleDom.jsx', () => {
        it('SimpleTest', () => {
            const result = SimpleDom.renderToString(
                <div id="id1"
                     class={{testCamelCase: true, noDisplay: false}}
                     style={{
                         marginTop: '5px',
                         marginBottom: '5px'
                     }}
                >
                    <div>content</div>
                </div>
            );

            expect(result).to.be.equal(
                '<div id="id1" class="test-camel-case" style="margin-top:5px;margin-bottom:5px"><div>content</div></div>');
        });

        it('SimpleComponent', () => {
            function MyDiv(attr) {
                return <div>{attr.content}</div>;
            }


            const result = SimpleDom.renderToString(
                <div id="id1">
                    <MyDiv content="content"/>
                </div>
            );

            expect(result).to.be.equal(
                '<div id="id1"><div>content</div></div>');
        })
    });

    describe('SimpleDom.checked', () => {
        it('UseOfUndefined in renderToString', () => {
            const result = SimpleDom.renderToString(
                <div id="id1">
                    <input type="checkbox" checked={undefined}/>
                </div>
            );

            expect(result).to.be.equal(
                '<div id="id1"><input type="checkbox"></input></div>');
        });
        it('UseOfUndefined in renderTo', () => {
            if (document.getElementById('container')) {
                document.getElementById('container').remove();
            }

            const container = document.createElement('div');
            container.id = 'container';

            document.body.appendChild(container);
            SimpleDom.renderTo(
		'container',
                <div id="id1">
                    <input type="checkbox" checked={undefined}/>
                </div>
            );

	    expect(document.getElementById("container").innerHTML).to.be.equal('<div id="id1"><input type="checkbox"></div>');
        });
    });
});

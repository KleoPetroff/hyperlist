import './_setup'
import assert from 'assert'
import HyperList from '../lib/index'

describe('Rendering', function () {
  beforeEach(() => {
    this.fixture = document.createElement('div')
  })

  afterEach(() => {
    if (this.actual) {
      this.actual.destroy()
    }
  })

  it('can render a small amount of items', (done) => {
    this.actual = new HyperList(this.fixture, {
      generate (i) {
        var el = document.createElement('div')
        el.innerHTML = i
        return el
      },
      height: 5,
      overrideScrollPosition () { return 0 },
      total: 3,
      itemHeight: 1
    })

    window.requestAnimationFrame(() => {
      assert.equal(this.fixture.childNodes.length, 4)
      assert.equal(this.fixture.querySelectorAll('div').length, 3)
      assert.equal(this.fixture.firstChild.nodeName, 'tr')
      done()
    })
  })

  it('can render with dynamic heights', (done) => {
    const total = 3
    const heights = new Array(3).fill(0).map((e, i) => (i + 1) * 10)

    this.actual = new HyperList(this.fixture, {
      generate (i) {
        var el = document.createElement('div')
        el.innerHTML = i
        return {element: el, height: heights[i]}
      },
      height: 10,
      overrideScrollPosition () { return 0 },
      total: total,
      itemHeight: 1
    })

    window.requestAnimationFrame(() => {
      assert.deepEqual([].slice.call(this.fixture.querySelectorAll('div')).map((e) => {
        return e.style.top
      }), ['0px', '10px', '30px'])
      done()
    })
  })
})

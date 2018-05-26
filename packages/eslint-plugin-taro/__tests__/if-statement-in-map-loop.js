const rule = require('../rules/custom/if-statement-in-map-loop')
const { RuleTester } = require('eslint')
const { parserOptions, testValid, testInvalid } = require('../utils/utils')

const ruleTester = new RuleTester({ parserOptions })

const ERROR_MESSAGE = '不允许在 JSX 参数(props)中传入 JSX 元素'

ruleTester.run('if-statement-in-map-loop', rule, {
  valid: testValid([
    `numbers.map((number) => number * 2)`,
    `numbers.map((number) => {
      return number * 2
    })`,
    `numbers.map((number) => {
      const element = <View />
      return number * 2
    })`,
    `numbers.map((number) => {
      const element = <View />
      return <View />
    })`,
    `numbers.map((number) => {
      const element = <View />
      let a = null
      if (number) {
        a = 'test'
      }
      return <View />
    })`
  ]),
  invalid: testInvalid(ERROR_MESSAGE, [
    `numbers.map((number) => {
      const element = <View />
      let a = null
      const isOdd = number % 2
      if (isOdd) {
        a = <View />
      }
      return a
    })`,
    `numbers.map((number) => {
      const element = <View />
      let a = null
      const isOdd = number % 2
      if (isOdd) {
        <View />
      }
      return a
    })`,
    `numbers.map((number) => {
      const element = <View />
      let a = null
      const isOdd = number % 2
      if (isOdd) {
        return <Custom />
      }
      return a
    })`
  ])
})

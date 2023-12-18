const index = require('../routes/index')
const education = require('../routes/api/education')
const professional = require('../routes/api/professional')
const interests = require('../routes/api/interests')
const skills = require('../routes/api/skills')
const research = require('../routes/api/research')

const endpoints = require('../routes/api/endpoints')
const apiIndex = require('../routes/api/index')
const user = require('../routes/api/user')
const users = require('../routes/api/users')
const auth = require('../routes/api/auth')
const refreshToken = require('../routes/api/refreshToken')
const logout = require('../routes/api/logout')

module.exports = {
    apiIndex,
    auth, refreshToken, logout,
    index,
    education, professional, interests, skills, research,
    endpoints,
    user,
    users
}
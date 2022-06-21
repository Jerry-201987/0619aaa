moment.locale('zh-cn');

let isLeapYear = function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

Vue.component('calendar', {
    props: {
        val: {
            type: Date,
            default() {
                return new Date()
            }
        }
    },
    filters: {
        fmtDate(val) {
            return moment(val).format('ll');
        }
    },
    computed: {
        monthDays() {
            let res = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.globalDate.getMonth()]
            //如果是二月，并且是闰年，则天数+1
            if (isLeapYear(this.globalDate.getFullYear()) && this.globalDate.getMonth() === 1)
                res += 1

            let arr = []
            for (let i = 1; i <= res; i++) {
                arr.push(new Date(`${this.globalDate.getFullYear()}-${this.globalDate.getMonth() + 1}-${i}`))
            }

            return arr
        },
        repairBefore() {
            let firstDay = new Date(this.globalDate)
            firstDay.setDate(1)
            let days = firstDay.getDay()

            let res = []
            for (let i = 0; i < days; i++) {
                firstDay.setDate(firstDay.getDate() - 1)
                res.unshift(new Date(firstDay))
            }

            return res
        },
        repairAfter() {
            let lastDay = new Date(this.globalDate)
            lastDay.setDate(this.monthDays.length)
            let days = 6 - lastDay.getDay()

            let res = []
            for (let i = 0; i < days; i++) {
                lastDay.setDate(lastDay.getDate() + 1)
                res.push(new Date(lastDay))
            }

            return res
        }
    },
    methods: {
        prev() {
            let temp = new Date(this.globalDate)
            temp.setDate(1)
            temp.setMonth(temp.getMonth() - 1) //10-1
            this.globalDate = temp
        },
        home() {
            this.globalDate = new Date()
        },
        next() {
            let temp = new Date(this.globalDate)
            temp.setMonth(temp.getMonth() + 1)
            temp.setDate(1)
            this.globalDate = temp
        },
        isToday(d) {
            let now = new Date()
            return moment(now).format('ll') === moment(d).format('ll')
        },
        isThatday(d) {
            return moment(this.val).format('ll') === moment(d).format('ll')
        },
        choose(d) {
            this.$emit('choose', moment(d).format('ll'))
        }
    },
    data() {
        return {
            globalDate: this.val,
        }
    },
    template: `
        <div class="container">
            <div class="flex j-s a-c" style="padding:5px 10px">
                {{globalDate | fmtDate}}
                <div>
                    <button @click='prev'>上月</button>
                    <button @click='home'>今天</button>
                    <button @click='next'>下月</button>
                </div>
            </div>
            <ul class="flex">
                <li v-for='str in "日一二三四五六"'>
                    {{str}}
                </li>
            </ul>
            <ul class="flex content">
                <li v-for='z in repairBefore' @click='choose(z)' class="disabled">{{z.getDate()}}</li>
                <li v-for='d in monthDays'  @click='choose(d)' :class='{active:isToday(d) ,active2:isThatday(d) }'>
                    {{d.getDate()}}
                </li>
                <li v-for='z in repairAfter' @click='choose(z)' class="disabled">{{z.getDate()}}</li>
            </ul>
        </div>
    
    `
})
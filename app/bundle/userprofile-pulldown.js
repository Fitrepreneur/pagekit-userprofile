var Fields =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(32)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(33)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\BixieProjects\\pagekit\\pagekit\\packages\\bixie\\userprofile\\app\\fields\\pulldown.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },

/***/ 28:
/***/ function(module, exports) {

	module.exports = {

	    props: ['isAdmin', 'profilevalues', 'user', 'field', 'form'],

	    methods: {
	        getDataObject: function (defaultValue) {
	            if (this.isAdmin) {
	                this.field.data.value = this.field.data.value || defaultValue;
	                return this.field.data;
	            }
	            return this.getProfilevalue(defaultValue);
	        },
	        getProfilevalue: function (defaultValue) {
	            var index = _.findIndex(this.profilevalues, 'field_id', this.field.id),
	                defaultProfilevalue = {
	                    id: 0,
	                    user_id: this.user.id,
	                    field_id: this.field.id,
	                    multiple: this.field.data.multiple || 0,
	                    value: defaultValue
	                };
	            if (index === -1) {
	                index = this.profilevalues.length;
	                this.profilevalues.push(defaultProfilevalue);
	            }
	            //multiple setting changed, convert value
	            if (this.field.data.multiple && this.profilevalues[index].multiple != this.field.data.multiple) {

	                this.profilevalues[index].multiple = this.field.data.multiple;

	                if (typeof this.profilevalues[index].value === 'object' && !this.profilevalues[index].multiple) {
	                    this.profilevalues[index].value = this.profilevalues[index].value[0];
	                }
	                if (typeof this.profilevalues[index].value !== 'object' && this.profilevalues[index].multiple) {
	                    this.profilevalues[index].value = [this.profilevalues[index].value];
	                }

	            }
	            return this.profilevalues[index];
	        },
	        fieldInvalid: function (form) {
	            return false; //todo form[this.fieldid].invalid;
	        }

	    },

	    computed: {
	        fieldRequired: function () {
	            return this.field.data.required && !this.isAdmin ? true : false;
	        },
	        fieldLabel: function () {
	            return this.isAdmin ? 'Default value' : this.field.label;
	        }
	    }

	};

/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>

	//     <div v-if="isAdmin && field.data.multiple" class="uk-form-row">
	//         <label for="form-size" class="uk-form-label">{{ 'Size' | trans }}</label>

	//         <div class="uk-form-controls">
	//             <input id="form-size" class="uk-form-width-small uk-text-right" type="number" min="1"
	//                    v-model="field.data.size" number>
	//         </div>
	//     </div>

	//     <div class="uk-form-row {{field.data.classSfx}}">
	//         <label :for="fieldid" class="uk-form-label" v-show="!field.data.hide_label">{{ fieldLabel | trans
	//             }}</label>

	//         <div class="uk-form-controls">

	//             <select v-if="field.data.multiple" class="uk-form-width-large" multiple="multiple"
	//                     :attr="{name: fieldid, id: fieldid, size:field.data.size > 1 ? field.data.size : false, required: fieldRequired}"
	//                     v-model="dataObject.value">
	//                 <option v-for="option in field.options" :value="option.value">{{ option.text }}</option>
	//             </select>

	//             <select v-if="!field.data.multiple" class="uk-form-width-large"
	//                     :attr="{name: fieldid, id: fieldid, size:(field.data.size > 1 ? field.data.size : false), required: fieldRequired}"
	//                     v-model="dataObject.value">
	//                 <option v-for="option in field.options" :value="option.value">{{ option.text }}</option>
	//             </select>

	//             <p class="uk-form-help-block uk-text-danger" v-show="fieldInvalid(form)">{{ field.data.requiredError ||
	//                 'Please select a value' | trans }}</p>
	//         </div>
	//     </div>

	// </template>

	// <script>
	var profilefieldMixin = __webpack_require__(28);

	module.exports = {

	    inherit: true,

	    mixins: [profilefieldMixin],

	    data: function data() {
	        return {
	            dataObject: {},
	            fieldid: _.uniqueId('field_')
	        };
	    },

	    created: function created() {
	        var defaultValue = this.field.data.multiple ? [] : this.field.options.length ? this.field.options[0].value : '';
	        this.$set('dataObject', this.getDataObject(this.field.data.value || defaultValue));
	    }

	};

	window.Profilefields.components['pulldown'] = module.exports;

	// </script>

/***/ },

/***/ 33:
/***/ function(module, exports) {

	module.exports = "<div v-if=\"isAdmin && field.data.multiple\" class=\"uk-form-row\">\n        <label for=\"form-size\" class=\"uk-form-label\">{{ 'Size' | trans }}</label>\n\n        <div class=\"uk-form-controls\">\n            <input id=\"form-size\" class=\"uk-form-width-small uk-text-right\" type=\"number\" min=\"1\"\n                   v-model=\"field.data.size\" number>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row {{field.data.classSfx}}\">\n        <label :for=\"fieldid\" class=\"uk-form-label\" v-show=\"!field.data.hide_label\">{{ fieldLabel | trans\n            }}</label>\n\n        <div class=\"uk-form-controls\">\n\n            <select v-if=\"field.data.multiple\" class=\"uk-form-width-large\" multiple=\"multiple\"\n                    :attr=\"{name: fieldid, id: fieldid, size:field.data.size > 1 ? field.data.size : false, required: fieldRequired}\"\n                    v-model=\"dataObject.value\">\n                <option v-for=\"option in field.options\" :value=\"option.value\">{{ option.text }}</option>\n            </select>\n\n            <select v-if=\"!field.data.multiple\" class=\"uk-form-width-large\"\n                    :attr=\"{name: fieldid, id: fieldid, size:(field.data.size > 1 ? field.data.size : false), required: fieldRequired}\"\n                    v-model=\"dataObject.value\">\n                <option v-for=\"option in field.options\" :value=\"option.value\">{{ option.text }}</option>\n            </select>\n\n            <p class=\"uk-form-help-block uk-text-danger\" v-show=\"fieldInvalid(form)\">{{ field.data.requiredError ||\n                'Please select a value' | trans }}</p>\n        </div>\n    </div>";

/***/ }

/******/ });
Vue.directive('focus', {
	//��������ص�DOMʱ���ý��㡣������v-show,������v-if���ܿ���Ч��.
	inserted: function (el) {
		el.focus();
    }
});

var vm = new Vue({
	el: '#app',
	data: {
		flag: false,
		errMsg: '',
		noAppointmentId: '',
		noAppointCode: '',
		noAppointName: '',
		noAppointSort: '',
		noAppointUse: '',
		noAppointRemarks: '',
		noAppointments: []
	},
	mounted: function(){
		this.queryData();
	},
    methods: {
    	clearForm: function(){
    		this.noAppointmentId = '';
    		this.noAppointCode = '';
    		this.noAppointName = '';
    		this.noAppointSort = '';
    		this.noAppointUse = '';
    		this.noAppointRemarks = '';
    	},
    	queryData: function(){
    		var that = this;
        	axios.get('noAppointment/viewAll').then(function(data){
        		console.log(data)
        		that.noAppointments = data.data;
        	}) 
    	},
        toAdd: function(){
        	this.flag = true;
        },
        toEdit: async function(id){
        	this.flag = true;
        	var ret = await axios.get('noAppointment/preModify?noAppointmentId=' + id);
        	console.log(ret);
    		this.noAppointmentId = ret.data.noAppointmentId;
    		this.noAppointCode = ret.data.noAppointCode;
    		this.noAppointName = ret.data.noAppointName;
    		this.noAppointSort = ret.data.noAppointSort;
    		this.noAppointUse = ret.data.noAppointUse;
    		this.noAppointRemarks = ret.data.noAppointRemarks;
        },
        toDelete: async function(id){
        	var flag = confirm("���Ҫɾ���ü�¼��");
     		if (!flag){
     			return;
     		}
     		
     		var ret = await axios.get('noAppointment/remove?noAppointmentId=' + id);
     		if (ret.data!="OK"){
            	alert(ret.data);
     		}else{
            	this.queryData();	//���¼�������
            }
        },
        toBack: function(){
         	this.clearForm();
         	this.flag = false;
         },
         modify: async function(){
          	// �༭ͼ��
             var ret = await axios.post('noAppointment/modify',{
            	noAppointmentId: this.noAppointmentId,
             	noAppointCode: this.noAppointCode,
             	noAppointName: this.noAppointName,
             	noAppointSort: this.noAppointSort,
             	noAppointUse: this.noAppointUse,
             	noAppointRemarks: this.noAppointRemarks
             });
             console.log(ret);
             if (ret.data!="OK"){
             	alert(ret.data);
             }else{
             	this.flag = false;
           		// ��ձ�
           		this.clearForm();
           		this.queryData();	//���¼�������
             }
         } 
    }
})
define( function () {
	'use strict';

	/* return an array of specs to be run */
	return {
		'specs' : [ 
			'spec/controllers/AppControllerTest',
			'spec/models/SegmentModelTest',
			'spec/models/ProgramModelTest',
			'spec/collections/ProgramCollectionTest',
			'spec/views/Programs/ProgramCollectionViewTest'
		 ]
	};
} );

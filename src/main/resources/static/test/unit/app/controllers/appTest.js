/**
 * Created by anthonyhayes on 4/29/14.
 */
function MyController($scope, $http) {
    $http.get('/auth.py').success(function(data) {
        $scope.user = data;
    });

    $scope.saveMessage = function(message) {
        $scope.status = 'Saving...';
        $http.post('/add-msg.py', message, {
            headers: {
                Authorization: 'xxx'
            }
        }).success(function(response) {
            $scope.status = '';
        }).error(function() {
            $scope.status = 'ERROR!';
        });
    };
}
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  console.log($stateParams);
  $scope.chat = Chats.get($stateParams.chatId);
  // $scope.chat = Chats.getChat($stateParams.chatId);
  $scope.$watch('chat',function(){
    Chats.save(Chats.all())
  },true)
})

.controller('AccountCtrl', function($scope,$state,Chats) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.chat = {id:0,name:'',lastText:'',face: 'img/ben.png'}
  $scope.add = function(){
    if(!$scope.chat.name || !$scope.chat.lastText)  return
    var chats = Chats.all()
    $scope.chat.id = chats[chats.length - 1].id + 1
    // console.log(chats[chats.length - 1].id);
    // console.log(typeof(chats[chats.length - 1].id));
    // console.log($scope.chat.id);
    Chats.push($scope.chat)
    Chats.save(Chats.all())
    $state.go("tab.chats");
  }
});

#include <iostream>
#include <vector>
#include<algorithm>


using namespace std;

int main(){
vector<int> arr={0,1,2,3,4,5};
//5 4 3 2 1 0
///4 5 3 2 1 0
//4 5 0 1 2 3

int k=2;
vector<int> ans;
reverse(arr.begin(), arr.end());
reverse(arr.begin(), arr.begin()+k);
reverse(arr.begin()+k, arr.end());
   for (int num : arr) {
        cout << num << " ";
    }
return 0;
}

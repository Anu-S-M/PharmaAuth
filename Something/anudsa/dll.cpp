#include<bits/stdc++.h>
using namespace std;
class Node{
public:
int data;
Node* next;
Node* back;
Node(int val, Node* n = nullptr, Node* b = nullptr) : data(val), next(n), back(b) {}
};


Node* inserttail(int val,Node* head){
Node* temp=head;
while(temp->next!=NULL){
temp=temp->next;
}
Node* newtail=new Node(val,nullptr,temp);
temp->next=newtail;
return head;
}




Node* convert2LL(vector<int> arr){
Node* head=new Node(arr[0]);
Node* prev=head;
for(int i=1;i<arr.size();i++){
Node* temp=new Node(arr[i],nullptr,prev);
prev->next=temp;
prev=temp;
}
return head;
}


int main(){
vector<int> arr={1,2,3};
Node* head=convert2LL(arr);
head=inserttail(50,head);
Node* current=head;
while(current!=NULL){
cout<<current->data<<" ";
current=current->next;
}
return 0;}

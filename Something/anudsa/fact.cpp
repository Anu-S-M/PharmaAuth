#include <iostream>
#include <vector>

using namespace std;

int factorial(int n) {
    if (n == 1 || n == 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

int factorialNumbers(int n) {
    if (n == 1) {
        return 1;
    }

    vector<int> sum;

    for (int i = 1; i <= n; i++) {
        sum.push_back(i * factorial(i - 1));
        if (sum[i - 1] < n) {
            return sum[i - 1];
        }
    }

    // Return a default value (you can choose an appropriate value) if no condition is met.
    return -1;
}

int main() {
    int n = 7;
    int result = factorialNumbers(n);
    cout << "Result: " << result << endl;
    return 0;
}

#define _WIN32_WINNT 0x0600
#include <windows.h> //Windowd specific liberaris
#include <wininet.h> // Internet status check k lie
#include <iostream> // Input and otput
#include <fstream> // File handling
// #include <thread> // Delay and sleep k lie
// #include <chrono>
using namespace std;

// Function RAM usage
double getRAMUsuage(){
     MEMORYSTATUSEX mem; // store memory
     mem.dwLength = sizeof(mem); // size of structure
     GlobalMemoryStatusEx(&mem); // fetch system current memory
     return mem.dwMemoryLoad; // Ram usage percentage return 
}

//function battery
int getBatteryPercent(){
    //Battery info store
    SYSTEM_POWER_STATUS status;

    // system se bettery info lega
    GetSystemPowerStatus(&status);
    
    //agar battery detect nhi hui
    if (status.BatteryLifePercent == 225){
        return -1;
    }

    // battery percentage return 
    return status.BatteryLifePercent;
}

//function Disk Usage 
double getDiskUsage(){
    ULARGE_INTEGER freeBytesAvailable;
    ULARGE_INTEGER totalNumberOfBytes;
   // ULARGE_INTEGER totalNumberOfFreeBytes; // disk info variable
// C drive ki info
BOOL result = GetDiskFreeSpaceExA(
    "D: \\",
    NULL,
    &freeBytesAvailable,
    &totalNumberOfBytes
 //   &totalNumberOfFreeBytes
);

if(result == 0){
    return 0;
}

long double total = (long double)totalNumberOfBytes.QuadPart;
long double free = (long double)freeBytesAvailable.QuadPart;
// Total disk size
//double total = (double)totalNumberOfBytes.QuadPart;
if (total <=0){
    return 0;
}
long double used = total -free;
long double usage = (used * 100.0)/total;
return (double)usage;
//Free disk size
// double free  =
//  (double)totalNumberOfFreeBytes.QuadPart;


//  double used = total - free;
// // Used disk percentage 
// return (used/total)*100.0;
}

//FUnction Internet check
 bool IsInternetConnected(){
    DWORD flage;

    //Intenet connect hai ya nhi
    InternetGetConnectedState(&flage,0);
 }

 // Function cpu usage
 double getCPUUsage(){
    // previous cpu timing store rahegi
    static FILETIME prevIdle, prevKernel, prevUser;

    // current CPu timing
    FILETIME idle, kernel, user;
    
    //current  CPU timing fetch
    GetSystemTimes(&idle, &kernel, &user);

    // File Time ko interger me convert
    ULONGLONG idleNow = ((ULONGLONG)idle.dwHighDateTime << 32)
     | idle.dwLowDateTime;
    ULONGLONG kernelNow = ((ULONGLONG)kernel.dwHighDateTime << 32)
    | kernel.dwLowDateTime;
    ULONGLONG userNow = ((ULONGLONG)user.dwHighDateTime << 32)
  | user.dwLowDateTime;

// Previous values
ULONGLONG idlePrev = 
((ULONGLONG)prevIdle.dwHighDateTime <<32)
| prevIdle.dwLowDateTime;
ULONGLONG kernelPrev = 
((ULONGLONG)prevKernel.dwHighDateTime << 32)
| prevKernel.dwLowDateTime;
ULONGLONG userPrev = 
((ULONGLONG)prevUser.dwHighDateTime <<32) 
| prevUser.dwLowDateTime;

//Difference Calculator
ULONGLONG idleDiff = idleNow  - idlePrev;
ULONGLONG kernelDiff = kernelNow - kernelPrev;
ULONGLONG userDiff = userNow - userPrev;

//Total Cpu work
ULONGLONG total = kernelDiff + userDiff;

// Current values ko next loop ke liye save
prevIdle = idle;
prevKernel = kernel;
prevUser = user;

//Safety check
if (total == 0){
    return 0;
} 

// Cpu ussage percentage return
return (double)(total - idleDiff) * 100.0 / total;
}

//temperature maintaince
double getTemperature(double cpu){
    double temp = 35 + (cpu * 0.6);
return temp;
}


//Main function
int main(){
    cout << "Smart Laptop Monitor Started.......\n";

    //CPu calculation started 
    getCPUUsage();

    // 1 sec wait
    Sleep(1000);

    // Infinite LOOP
    while(true){
//read cpu usage
double cpu = getCPUUsage();
double temp = getTemperature(cpu);
//real ram usage
double ram = getRAMUsuage();

//real Battery percentage
double battery = getBatteryPercent();

// real disk usage
double disk = getDiskUsage();

//real internet connected hai ya nhi
bool internet = IsInternetConnected();

//Default system status
string status = "Normal";

//agar cpu ya ram jada hua
if (cpu >85 || ram >85){
    status = "HIGH_USAGE";
}

//Jason file create and open
ofstream file("stats.json");

//jason data write
file << "{\n";

file << " \"cpu\":"
     << cpu
     << ",\n";

file << "  \"ram\": "
     << ram
     << ",\n";

    file << " \"battery\":"
        << battery
        << ",\n";

file << " \"disk\": "
     << disk
     << ",\n";

file << " \"internet\": \""
     << (internet ? "Connected" : "Disconnected")
     << "\"\n";

file << " \"status\": \""
     << status
     << "\"\n";

file << "}";

//close file
file.close();

//console output 
cout << "CPU: " << cpu
    << " | Temperature: " << temp << "C "
     << "% | RAM: " <<ram
    << "% | Battery: " << battery
    << "% | Disk: " << disk
    << "% | NET: "
    << (internet ? "ON" : "OFF")
    << " | status: "
    << status
    << endl;
    
    // wait for 2 second

Sleep(2000);

    }

    return 0;
}
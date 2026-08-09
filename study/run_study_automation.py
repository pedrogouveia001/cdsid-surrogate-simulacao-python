import os
import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def run_simulation_study():
    # 1. Config Chrome Options for clean full-height screenshots
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=1400,1250")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    # 2. Setup output directories
    base_dir = r"C:\Pedro - CDSID\Sistema de Simulação\Surrogate Simulação\Surrogate Simulação Python"
    screenshot_dir = os.path.join(base_dir, "study", "screenshots")
    os.makedirs(screenshot_dir, exist_ok=True)
    
    results_json_path = os.path.join(base_dir, "study", "study_results.json")
    
    # Load existing records if they exist to support resuming
    study_records = []
    completed_cases = set()
    if os.path.exists(results_json_path):
        try:
            with open(results_json_path, "r", encoding="utf-8") as f:
                study_records = json.load(f)
                for rec in study_records:
                    completed_cases.add(rec["case_id"])
            print(f"Loaded {len(study_records)} existing case results. Resuming study...")
        except Exception as e:
            print("Could not load existing results JSON, starting fresh:", e)
            study_records = []
            
    # Initialize WebDriver
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    try:
        print("Opening SPEAR Simulation system...")
        driver.get("http://127.0.0.1:5001/login")
        
        # Log in
        print("Logging in...")
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "email"))
        )
        driver.find_element(By.NAME, "email").send_keys("test_sim_user@example.com")
        driver.find_element(By.NAME, "password").send_keys("Password123")
        driver.find_element(By.XPATH, "//button[@type='submit']").click()
        
        # Verify redirects to options page
        WebDriverWait(driver, 10).until(
            EC.url_contains("/options")
        )
        print("Log in successful!")
        
        # Configurations Matrix
        alternatives_list = [10, 20, 50, 100, 200]
        criteria_list = [3, 4, 5, 6, 7]
        instances_count = 1000
        
        # Loop over 25 configurations
        for c in criteria_list:
            for a in alternatives_list:
                case_id = f"{a}A{c}C"
                
                # Resume check
                if case_id in completed_cases:
                    print(f"Case {case_id} already completed. Skipping.")
                    continue
                    
                print(f"\n--- Starting Case {case_id} (Alternatives: {a}, Criteria: {c}) ---")
                
                # Navigate to setup page
                driver.get("http://127.0.0.1:5001/setup")
                
                # Fill simulation inputs
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.ID, "numAlt"))
                )
                
                name_input = driver.find_element(By.ID, "simulationName")
                name_input.clear()
                name_input.send_keys(f"Case {case_id}")
                
                alt_input = driver.find_element(By.ID, "numAlt")
                alt_input.clear()
                alt_input.send_keys(str(a))
                
                # Select criteria count
                crit_select = driver.find_element(By.ID, "numCrit")
                for option in crit_select.find_elements(By.TAG_NAME, "option"):
                    if option.get_attribute("value") == str(c):
                        option.click()
                        break
                
                inst_input = driver.find_element(By.ID, "numInstancias")
                inst_input.clear()
                inst_input.send_keys(str(instances_count))
                
                # Trigger simulation run
                print("Triggering simulation...")
                driver.find_element(By.ID, "btnRunSimulation").click()
                
                # Wait for redirect to results (increased timeout to 240s for C=7 simulation)
                print("Waiting for simulation execution and results page load...")
                WebDriverWait(driver, 240).until(
                    EC.url_contains("/results")
                )
                
                # Wait for Chart.js animation to complete
                time.sleep(3.0)
                
                # Extract results from DOM
                mean_q = driver.find_element(By.ID, "meanQuestions").text
                std_q = driver.find_element(By.ID, "stdQuestions").text
                
                pct_10 = driver.find_element(By.ID, "pct10").text
                pct_25 = driver.find_element(By.ID, "pct25").text
                pct_50 = driver.find_element(By.ID, "pct50").text
                pct_75 = driver.find_element(By.ID, "pct75").text
                pct_90 = driver.find_element(By.ID, "pct90").text
                pct_95 = driver.find_element(By.ID, "pct95").text
                pct_100 = driver.find_element(By.ID, "pct100").text
                
                # Extract probabilities
                prob_rows = driver.find_elements(By.XPATH, "//table[@id='probQuestionsTable']/tbody/tr")
                probabilities = {}
                for row in prob_rows:
                    cols = row.find_elements(By.TAG_NAME, "td")
                    if len(cols) == 2:
                        questions_key = cols[0].text.strip()
                        prob_val = cols[1].text.strip()
                        probabilities[questions_key] = prob_val
                
                print(f"Metrics: Mean={mean_q}, StdDev={std_q}, Median={pct_50}, Max={pct_100}")
                
                # Save screenshot of dashboard
                screenshot_filename = f"results_{case_id}.png"
                screenshot_path = os.path.join(screenshot_dir, screenshot_filename)
                
                # Hide navigation header/footer for cleaner academic style inside screenshots
                try:
                    driver.execute_script("document.querySelector('.app-header').style.display='none';")
                    driver.execute_script("document.querySelector('.sub-nav').style.display='none';")
                    driver.execute_script("document.querySelector('.app-footer').style.display='none';")
                    time.sleep(0.5)
                except Exception as e:
                    print("Could not hide layouts:", e)
                
                driver.save_screenshot(screenshot_path)
                print(f"Screenshot saved to: {screenshot_path}")
                
                # Restore elements if needed (though we reload next anyway)
                try:
                    driver.execute_script("document.querySelector('.app-header').style.display='flex';")
                    driver.execute_script("document.querySelector('.sub-nav').style.display='flex';")
                    driver.execute_script("document.querySelector('.app-footer').style.display='flex';")
                except:
                    pass
                
                # Store record
                study_records.append({
                    "case_id": case_id,
                    "num_alt": a,
                    "num_crit": c,
                    "mean": float(mean_q.replace(",", ".")),
                    "std": float(std_q.replace(",", ".")),
                    "percentiles": {
                        "10": int(pct_10),
                        "25": int(pct_25),
                        "50": int(pct_50),
                        "75": int(pct_75),
                        "90": int(pct_90),
                        "95": int(pct_95),
                        "100": int(pct_100)
                    },
                    "probabilities": probabilities,
                    "screenshot": screenshot_filename
                })
                
                # Save dynamically in loop to prevent data loss in case of timeouts
                with open(results_json_path, "w", encoding="utf-8") as f:
                    json.dump(study_records, f, indent=4, ensure_ascii=False)
        
        print(f"\nAll cases completed. Summary saved to: {results_json_path}")
        
    except Exception as e:
        print("An error occurred during automation:", e)
        import traceback
        traceback.print_exc()
    finally:
        driver.quit()

if __name__ == "__main__":
    run_simulation_study()

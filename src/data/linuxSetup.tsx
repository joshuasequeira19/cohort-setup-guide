import type { StepMap } from '@/types/guide'
import { CommandBlock, LinkChip, Callout, Kbd, InlineCode, IconWindows, IconMac, IconLinux } from '@/components/guide/primitives'
import { StepDisclosure } from '@/components/guide/StepDisclosure'

export const linuxSetupSteps: StepMap = {
  start: {
    tag: 'Step 1',
    crumb: null,
    title: 'Which kind of computer are you on?',
    body: <p>Pick one below. If you're not sure, that's fine, we'll figure it out together in class.</p>,
    options: [
      { label: 'Windows', to: 'win_check', icon: <IconWindows /> },
      { label: 'Mac', to: 'mac_check', icon: <IconMac /> },
      { label: 'Linux (already)', to: 'linux_check', icon: <IconLinux /> },
    ],
  },

  linux_check: {
    tag: 'Linux · Step 2',
    crumb: 'already on linux',
    title: "You're already on Linux, nice",
    body: <p>Nothing to install here. Let's just confirm your setup looks right for the cohort before moving on.</p>,
    next: 'verify',
    nextLabel: 'Take me to the verification step →',
  },

  win_check: {
    tag: 'Windows · Step 2',
    crumb: 'find version',
    title: 'First, find your Windows version',
    body: (
      <ol>
        <li>
          Press <Kbd>Windows</Kbd> + <Kbd>R</Kbd>
        </li>
        <li>
          Type <InlineCode>winver</InlineCode> and press Enter
        </li>
        <li>A window pops up with your Windows edition and build number, keep it open</li>
      </ol>
    ),
    next: 'win_admin',
    nextLabel: 'Got it, I can see my version →',
  },

  win_admin: {
    tag: 'Windows · Step 3',
    crumb: null,
    title: 'Do you have administrator access on this computer?',
    body: <p>If it's your own personal laptop, almost certainly yes. If it's a work laptop, check with IT if unsure, better to ask now than on day one.</p>,
    options: [
      { label: "Yes, I'm an admin", to: 'win_virt' },
      { label: 'No / not sure', to: 'win_blocked' },
    ],
  },

  win_blocked: {
    tag: 'Windows',
    crumb: 'blocked',
    title: 'No admin rights is a hard blocker for this method',
    body: (
      <>
        <Callout variant="warn">This isn't something you can work around from inside Windows.</Callout>
        <p>Options:</p>
        <ul>
          <li>Ask IT to grant temporary admin rights, or to run the install steps for you</li>
          <li>If it's a personal computer, check with whoever set it up, there is likely already an admin account</li>
          <li>Use a personal computer, or a family member's, for the live sessions instead</li>
        </ul>
      </>
    ),
    end: true,
  },

  win_virt: {
    tag: 'Windows · Step 4',
    crumb: 'check virtualization',
    title: 'Make sure virtualization is switched on',
    body: (
      <>
        <ol>
          <li>
            Press <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>Esc</Kbd> to open Task Manager
          </li>
          <li>
            Click the <b>Performance</b> tab, then <b>CPU</b>
          </li>
          <li>
            Look for <b>Virtualization</b>, it should say <b>Enabled</b>
          </li>
        </ol>
        <StepDisclosure summary="It says Disabled, what do I do?">
          <ol>
            <li>Restart your computer</li>
            <li>
              On the very first startup screen, repeatedly press your manufacturer's key, commonly <Kbd>F2</Kbd>,{' '}
              <Kbd>F10</Kbd>, <Kbd>F12</Kbd>, <Kbd>Del</Kbd>, or <Kbd>Esc</Kbd> (search "[your laptop brand] BIOS key" if
              unsure)
            </li>
            <li>
              Find <b>Intel Virtualization Technology</b>, <b>Intel VT-x</b>, <b>AMD-V</b>, or <b>SVM Mode</b>, set it to{' '}
              <b>Enabled</b>
            </li>
            <li>
              Save changes and exit, usually <Kbd>F10</Kbd>
            </li>
          </ol>
        </StepDisclosure>
      </>
    ),
    next: 'win_branch',
    nextLabel: 'Virtualization is enabled →',
  },

  win_branch: {
    tag: 'Windows · Step 5',
    crumb: null,
    title: 'Which version did winver show?',
    body: <></>,
    options: [
      { label: 'Windows 11, or Windows 10 build 19041 or higher', to: 'win_pathA' },
      { label: 'Windows 10, build below 19041', to: 'win_pathB' },
    ],
  },

  win_pathA: {
    tag: 'Windows · Install',
    crumb: 'wsl install',
    title: 'Install WSL2 and Ubuntu',
    body: (
      <>
        <p>
          Right-click the <b>Start</b> button and choose <b>Terminal (Admin)</b> or <b>Windows PowerShell (Admin)</b>,
          then run:
        </p>
        <CommandBlock label="PowerShell (Admin)" code="wsl --install" />
        <p>
          Restart when prompted. Ubuntu should open automatically after and ask you to create a username and password,
          this is separate from your Windows login. Write these down, you'll need them every time.
        </p>
        <StepDisclosure summary="It's hanging at 0% and not progressing">
          <p>Cancel and run this instead:</p>
          <CommandBlock label="PowerShell (Admin)" code="wsl --install --web-download -d Ubuntu" />
        </StepDisclosure>
      </>
    ),
    next: 'verify',
    nextLabel: 'Ubuntu opened and asked for a username →',
  },

  win_pathB: {
    tag: 'Windows · Install',
    crumb: 'update first',
    title: 'Update Windows first, then install',
    body: (
      <>
        <p>The simplest fix is updating Windows:</p>
        <ol>
          <li>
            Go to <b>Settings → Update &amp; Security → Windows Update</b>
          </li>
          <li>
            Click <b>Check for updates</b> and install everything available, restarting as needed
          </li>
          <li>
            Run <InlineCode>winver</InlineCode> again to confirm your build is now 19041 or higher
          </li>
        </ol>
        <Callout variant="info">Once your build is 19041+, come back to the Windows install step below.</Callout>
        <StepDisclosure summary="I can't update Windows right now, is there another way?">
          <p>A manual install is possible but more involved. Open PowerShell as Administrator and run these one at a time:</p>
          <CommandBlock
            label="PowerShell (Admin)"
            code={
              'dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart\ndism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart'
            }
          />
          <p>
            Restart your computer, then follow Microsoft's manual install steps at{' '}
            <LinkChip url="learn.microsoft.com/windows/wsl/install-manual" /> to download the Linux kernel update and
            install Ubuntu from the Microsoft Store.
          </p>
        </StepDisclosure>
      </>
    ),
    options: [{ label: 'Windows updated, build is now 19041+', to: 'win_pathA' }],
  },

  mac_check: {
    tag: 'Mac · Step 2',
    crumb: 'find chip',
    title: 'Find out which chip you have',
    body: (
      <>
        <ol>
          <li>Click the Apple logo in the top-left corner of your screen</li>
          <li>
            Click <b>About This Mac</b>
          </li>
          <li>
            Look for the line labeled <b>Chip</b> or <b>Processor</b>
          </li>
        </ol>
        <p>
          If it says <b>Apple M1, M2, M3, M4</b> or similar → that's Apple Silicon.
          <br />
          If it says <b>Intel Core i5, i7, i9</b> or similar → that's an Intel Mac.
        </p>
        <Callout variant="warn">
          Take an extra second to get this right. Downloading the wrong VirtualBox build or the wrong Ubuntu ISO
          architecture for your chip won't just fail cleanly, it causes confusing, hard-to-diagnose boot errors
          later on that look unrelated to this choice.
        </Callout>
      </>
    ),
    options: [
      { label: 'Apple Silicon (M-series)', to: 'mac_arm' },
      { label: 'Intel', to: 'mac_intel' },
    ],
  },

  mac_intel: {
    tag: 'Intel Mac · Install',
    crumb: null,
    title: 'Install VirtualBox and Ubuntu Server',
    body: (
      <>
      <ol>
        <li>
          Go to <LinkChip url="www.virtualbox.org/wiki/Downloads" /> and download the package under{' '}
          <b>macOS / Intel hosts</b>
        </li>
        <li>Open the file and run the installer</li>
        <li>
          macOS will likely block it the first time. Go to <b>System Settings → Privacy &amp; Security</b>, scroll
          down, click <b>Allow</b> next to the message about Oracle software
        </li>
        <li>Restart if prompted</li>
        <li>
          Open VirtualBox for the first time. If it asks you to choose an <b>Experience Mode</b>, pick{' '}
          <b>Basic Mode</b>, it hides advanced options you won't need for this
        </li>
        <li>
          Go to <LinkChip url="ubuntu.com/download/server" /> and download the standard Ubuntu Server ISO. We only
          need a terminal, not a graphical desktop, so this is the lighter option
        </li>
        <li>
          In VirtualBox, click <b>New</b>, name the VM, set Type to <b>Linux</b>, Version to <b>Ubuntu (64-bit)</b>
        </li>
        <li>
          Allocate at least <b>4096 MB memory</b> (VirtualBox asks for this in MB, that's 4GB), <b>2 vCPUs</b>, and{' '}
          <b>25GB disk space</b>. If the wizard shows a <b>Use EFI</b> checkbox, leave it{' '}
          <b>unchecked</b>, it can cause the VM to fail to boot from the installer
        </li>
        <li>
          Before starting the VM, go to <b>Settings → Storage</b>, click the empty disk icon under the storage
          controller listed there (may be called <b>IDE</b>, <b>SATA</b>, or <b>VirtioSCSI</b> depending on your
          VirtualBox version), choose <b>Choose a disk file...</b>, and select the Ubuntu ISO you downloaded
        </li>
        <li>Start the VM and follow the Ubuntu installer prompts, this is where you create your Linux username and password, write these down</li>
      </ol>
      <StepDisclosure summary="It boots to a black screen saying &ldquo;No bootable option or device was found&rdquo;">
        <p>Work through these in order, they cover the common causes:</p>
        <ol>
          <li>
            Open <b>Settings → Storage</b> and confirm the Ubuntu ISO is actually attached to an optical drive, not
            just sitting unattached in the list
          </li>
          <li>
            If it's attached, click it and check the <b>Live CD/DVD</b> box in the panel on the right if there is
            one
          </li>
          <li>
            Go to <b>Settings → System → Motherboard</b> and confirm <b>Optical</b> is checked in Boot Device
            Order, and try unchecking <b>EFI</b> there too, some VirtualBox versions can't boot a CD over certain
            controllers with EFI on
          </li>
          <li>
            Double check the ISO architecture matches your Mac's chip (Intel → x86-64/amd64 ISO, Apple Silicon →
            ARM64 ISO). A mismatch here fails with this exact error and nothing above will fix it
          </li>
          <li>Fully power off the VM (not just reset) after changing any setting, then start it again</li>
          <li>Still stuck? Delete the VM and recreate it, unchecking EFI during creation this time</li>
        </ol>
      </StepDisclosure>
      </>
    ),
    next: 'verify',
    nextLabel: 'Ubuntu installer finished →',
  },

  mac_arm: {
    tag: 'Apple Silicon Mac · Install',
    crumb: null,
    title: 'Install VirtualBox (ARM) and Ubuntu',
    body: (
      <>
        <ol>
          <li>
            Go to <LinkChip url="www.virtualbox.org/wiki/Downloads" /> and download the package under{' '}
            <b>macOS / Arm64 hosts</b>. This matters, the Intel package won't work on your machine
          </li>
          <li>
            Confirm the version is <b>7.1 or newer</b>, older versions don't support Apple Silicon
          </li>
          <li>
            Same permission steps as Intel: <b>System Settings → Privacy &amp; Security → Allow</b>
          </li>
          <li>
            Open VirtualBox for the first time. If it asks you to choose an <b>Experience Mode</b>, pick{' '}
            <b>Basic Mode</b>, it hides advanced options you won't need for this
          </li>
          <li>
            Go to <LinkChip url="ubuntu.com/download/server/arm" /> and download the standard <b>26.04 LTS</b> ISO
            (not the "64k page size" one). Ubuntu buries this page behind a link on the main download page, so this
            goes straight there. Do not use the x86-64 ISO from the regular download page, it won't run here at all
          </li>
          <li>
            Create the VM the same way, selecting the ARM-compatible Linux type if prompted, at least{' '}
            <b>4096 MB memory</b>, <b>2 vCPUs</b>, and <b>25GB disk space</b>. If the wizard shows a{' '}
            <b>Use EFI</b> checkbox, leave it <b>unchecked</b>, it can cause the VM to fail to boot from the
            installer
          </li>
          <li>
            Before starting the VM, go to <b>Settings → Storage</b>, click the empty disk icon under the storage
            controller listed there (may be called <b>IDE</b>, <b>SATA</b>, or <b>VirtioSCSI</b> depending on your
            VirtualBox version), choose <b>Choose a disk file...</b>, and select the ARM64 Ubuntu ISO you downloaded
          </li>
          <li>Start the VM and follow the Ubuntu installer prompts, note your username and password</li>
        </ol>
        <StepDisclosure summary="It boots to a black screen saying &ldquo;No bootable option or device was found&rdquo;">
          <p>Work through these in order, they cover the common causes:</p>
          <ol>
            <li>
              Open <b>Settings → Storage</b> and confirm the Ubuntu ISO is actually attached to an optical drive,
              not just sitting unattached in the list
            </li>
            <li>
              If it's attached, click it and check the <b>Live CD/DVD</b> box in the panel on the right if there is
              one
            </li>
            <li>
              Go to <b>Settings → System → Motherboard</b> and confirm <b>Optical</b> is checked in Boot Device
              Order, and try unchecking <b>EFI</b> there too, some VirtualBox versions can't boot a CD over certain
              controllers with EFI on
            </li>
            <li>
              Double check the ISO is actually the <b>ARM64</b> build, not x86-64/amd64. A mismatch here fails with
              this exact error and nothing above will fix it
            </li>
            <li>Fully power off the VM (not just reset) after changing any setting, then start it again</li>
            <li>Still stuck? Delete the VM and recreate it, unchecking EFI during creation this time</li>
          </ol>
        </StepDisclosure>
        <StepDisclosure summary="VirtualBox isn't behaving well on my machine">
          <p>This is still a newer path for Apple Silicon. Switch to UTM instead:</p>
          <ol>
            <li>
              Go to <LinkChip url="mac.getutm.app" /> and download UTM
            </li>
            <li>
              Open UTM, browse the built-in gallery, choose the <b>Ubuntu</b> template, it handles the correct ARM
              download automatically
            </li>
          </ol>
        </StepDisclosure>
      </>
    ),
    next: 'verify',
    nextLabel: 'Ubuntu installer finished →',
  },

  verify: {
    tag: 'Final check',
    crumb: 'verify',
    title: 'Verify it worked',
    body: (
      <>
        <p>
          Open a terminal, either your WSL window on Windows, the terminal inside your Ubuntu VM on Mac, or your
          regular terminal if you're already on Linux, and run:
        </p>
        <CommandBlock label="bash" code={'whoami\npwd\nlsb_release -a'} />
        <p>You should see your username, current folder, and Ubuntu version print out with no errors.</p>
        <Callout variant="good">All three ran clean? You're set up correctly.</Callout>
      </>
    ),
    endGood: true,
  },
}
